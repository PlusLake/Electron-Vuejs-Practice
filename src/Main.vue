<template>
    <div id="main">
        <div class="time">{{ formatTime(time) }}</div>
        <div class="frame">
            <Menu
                :title="'Alarm'" 
                :left="{ text: 'Edit', onClick: () => null }"
                :right="{ text:'＋', onClick: () => alarmAdd.visible = true }"
            />
            <div class="alarm-items">
                <div v-for="alarm in alarms" :key="alarm.id">
                    <AlarmItem :hour="alarm.hour" :minute="alarm.minute" :description="alarm.description" />
                </div>
            </div>
            <AlarmAdd
                :visible="alarmAdd.visible"
                :close="() => alarmAdd.visible = false"
                :register="v => addAlarm(v)"
            />
            <Footer/>
        </div>
    </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Menu from "@/components/Menu.vue";
import AlarmItem from "@/components/AlarmItem.vue";
import AlarmAdd from "@/components/AlarmAdd.vue";

export default {
    name: "Main",
    components: { Footer, AlarmItem, AlarmAdd, Menu },
    data() {
        return {
            time: {},
            alarms: [
                { id: 0, hour: 7, minute: 21, description: "Go to school." },
                { id: 1, hour: 8, minute: 10, description: "Buy bread." },
            ],
            alarmAdd: { visible: false }
        };
    },
    computed: {
        timezoneOffset() {
            return -Math.floor(new Date().getTimezoneOffset() / 60);
        }
    },
    mounted() {
        clearInterval(localStorage.getItem("timer"));
        localStorage.setItem("timer", setInterval(() => this.time = this.currentTime(), 100));
    },
    methods: {
        currentTime() {
            let totalSecond = Math.floor(Date.now() / 1000 % 86400);
            let second = totalSecond % 60;
            let minute = Math.floor(totalSecond / 60) % 60;
            let hour = Math.floor((totalSecond / 3600 + this.timezoneOffset) % 24);
            return {"hour" : hour, "minute" : minute, "second" : second};
        },
        formatTime(time) {
            return [ time.hour, time.minute, time.second ]
                .map(v => (v + "").padStart(2, "0"))
                .join(":")
        },
        addAlarm(alarm) {
            this.alarmAdd.visible = false;
            this.alarms.push(alarm);
        },
    },
};
</script>

<style scoped>
.frame {
    position: relative;
    height: 100%;
}
.alarm-items {
    padding-left: 12px;
}
.time {
    z-index: 10;
    font-family: "medium";
    background-color: #131313;
    font-size: 16px;
    text-align: center;
    padding-top: 4px;
    -webkit-app-region: drag;
}
</style> 