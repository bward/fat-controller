import express from "express";

import TrainController from "./controllers/TrainController";
import HubController from "./controllers/HubController";

const app: express.Express = express();
const trainController: TrainController = new TrainController();
const hubController: HubController = new HubController(trainController);

app.post("/connect", async (req, res) => {
    await hubController.scan();
    res.sendStatus(200);
});

app.post("/disconnect", async (req, res) => {
    try {
        await hubController.disconnect();
        res.sendStatus(200);
    } catch(Error) {
        res.status(404).send("Train not found");
    }
});

app.post("/forward/:speed", async (req, res) => {
    try {
        trainController.forward(req.params.speed);
    } catch(Error) {
        res.status(404).send("Train not found");
    }
});

app.get("/status", (req, res) => res.send(hubController.trainIsConnected));
app.listen(3000, () => console.log("Fat Controller listening on port 3000!"));