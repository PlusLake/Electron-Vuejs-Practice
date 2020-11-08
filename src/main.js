import Vue from "vue"
import Main from "./Main.vue"
import "./assets/css.css"

Vue.config.productionTip = false
window.ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg);
})
window.ipcRenderer.send("LOAD_ALARMS");

window.ipcRenderer.on("ALARMS_LOADED", (event, arg) => {
    console.log(arg);
})

new Vue({
    render: h => h(Main),
}).$mount("#app")
