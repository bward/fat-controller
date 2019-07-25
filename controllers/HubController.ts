import PoweredUP, { PUPHub } from "node-poweredup";
import TrainController from "./TrainController";
import { Option, none, option, some } from "fp-ts/lib/Option";

export default class HubController {
    private hub: Option<PUPHub> = none;
    private poweredUP: PoweredUP;

    constructor(trainController: TrainController) {
        this.poweredUP = new PoweredUP();
        this.poweredUP.on("discover", async (hub: PUPHub) => {
            await hub.connect();
            this.hub = some(hub);
            trainController.setHub(this.hub);
        });
    }

    public async scan(): Promise<boolean> {
        return this.poweredUP.scan();
    }

    public async disconnect(): Promise<void> {
        option.map(this.hub, async (h) => await h.shutdown());
    }

    public get trainIsConnected(): boolean {
        return this.hub !== none;
    }}