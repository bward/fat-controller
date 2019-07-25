import { PoweredUP } from "node-poweredup";
const poweredUP: PoweredUP = new PoweredUP();

poweredUP.on("discover", async (hub) => {
    console.log(`Discovered ${hub.name}!`);
    await hub.connect();
    console.log("Connected");
    await hub.sleep(3000);

    while (true) {
        console.log("Running motor B at speed 75");
        hub.setMotorSpeed("B", 75);
        console.log("Running motor A at speed 100 for 2 seconds");
        await hub.setMotorSpeed("A", 100,  2000);
        await hub.sleep(1000);
        console.log("Running motor A at speed -50 for 1 seconds");
        await hub.setMotorSpeed("A", -50,  1000);
        await hub.sleep(1000);
    }
});

poweredUP.scan();
console.log("Scanning for Hubs...");