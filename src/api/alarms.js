export default {
    loadAlarms(callback) {
        new Promise(resolve => resolve(window.ipcRenderer.sendSync("LOAD_ALARMS")))
            .then(callback);
    },
    saveAlarms(alarms) {
        window.ipcRenderer.send("SAVE_ALARMS", alarms);
    },
}