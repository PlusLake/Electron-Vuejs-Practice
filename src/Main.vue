<template>
    <div id="main">
        <div class="time">{{ formatTime(time) }}</div>
        <div class="frame">
            <Menu
                :title="'Alarm'" 
                :left="{ text: isEditing ? 'Done' : 'Edit', onClick: () => isEditing = !isEditing }"
                :right="{ text:'＋', onClick: () => alarmAdd.visible = true }"
            />
            <div class="alarm-items">
                <div v-for="alarm in alarms" :key="alarm.id">
                    <AlarmItem
                        :id="alarm.id"
                        :hour="alarm.hour"
                        :minute="alarm.minute"
                        :description="alarm.description"
                        :isEditing="isEditing"
                        :remove="id => alarms = alarms.filter(v => v.id != id)"
                    />
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
                { id: this.randomString(), hour: 7, minute: 21, description: "Go to school." },
                { id: this.randomString(), hour: 8, minute: 10, description: "Buy bread." },
            ],
            alarmAdd: { visible: false },
            isEditing: false,
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
        randomString() {
            return [...Array(32)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
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