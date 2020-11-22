const { ipcMain } = require("electron");
const FilsSystem = require("fs");
const HOME = require("os").homedir();
const PATH = HOME + "/.pluslib/alarm/";
const FILENAME = "alarm.json";

/* Create file and related directories if necessary */
const saveAlarm = content => {
    let failed = false;
    try {
        FilsSystem.mkdirSync(PATH, { recursive: true }, () => {
            failed = true;
        });
        if (!failed) {
            FilsSystem.writeFileSync(PATH + FILENAME, content);
        }
    } catch {
        return false;
    }
    return true;
}

// Load alarms from file
ipcMain.on("LOAD_ALARMS", event => {
    let data = {};
    try {
        data = JSON.parse(FilsSystem.readFileSync(PATH + FILENAME, "utf-8"));
    } catch {
        if (!saveAlarm("{}")) {
            /**
             * TODO:
             * Tell the client cannot open alarm.json
             * and every alarms would not be saved.
             */
        }
    }
    event.returnValue = data;
});

// Write alarms to file
ipcMain.on("SAVE_ALARMS", (event, alarms) => {
    event.reply("SAVE_ALARMS", saveAlarm(JSON.stringify(alarms)));
});