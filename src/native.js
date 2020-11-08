const { ipcMain } = require("electron");
const FilsSystem = require("fs");

ipcMain.on("asynchronous-message", (event, arg) => {
    console.log(arg);
    event.reply("asynchronous-reply", Math.random());
});

ipcMain.on("LOAD_ALARMS", event => {
    const data = FilsSystem.readFileSync("/home/plus/fs-test.txt", "utf-8");
    event.reply("asynchronous-reply", JSON.parse(data));
});