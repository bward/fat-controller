import { PUPHub } from "node-poweredup";
import { Option, none, option, some } from "fp-ts/lib/Option";

export default class TrainController {
    private hub: Option<PUPHub> = none;
    private static PORT = "A";

    public async forward(speed: number, time?: number): Promise<void> {
        option.map(this.hub, h => h.setMotorSpeed(TrainController.PORT, speed, time));
    }

    public async stop(): Promise<void> {
        option.map(this.hub, h => h.setMotorSpeed(TrainController.PORT, 0));
    }

    public setHub(hub: Option<PUPHub>): void {
        this.hub = hub;
    }
}