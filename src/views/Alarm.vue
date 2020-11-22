<template>
    <div class="alarm">
        <Menu
            :title="'Alarm'" 
            :left="{ text: alarms.length == 0 ? '' : isEditing ? 'Done' : 'Edit', onClick: () => isEditing = !isEditing }"
            :right="{ text:'＋', onClick: () => alarmAdd.visible = true }"
        />
        <div class="alarm-items">
            <div v-for="(alarm, index) in alarms" :key="alarm.id">
                <AlarmItem
                    :id="alarm.id"
                    :enabled="alarm.enabled"
                    :hour="alarm.hour"
                    :minute="alarm.minute"
                    :description="alarm.description"
                    :isEditing="isEditing"
                    :remove="id => removeAlarm(id)"
                    :offset="index"
                    :switched="switchAlarm"
                />
            </div>
            <div v-for="alarm in alarmsDeleting" :key="alarm.id">
                <AlarmItem
                    :id="alarm.id"
                    :hour="alarm.hour"
                    :minute="alarm.minute"
                    :description="alarm.description"
                    :offset="alarm.offset"
                    :removing="true"
                    :isEditing="true"
                    :removed="id => alarmsDeleting = alarmsDeleting.filter(v => v.id != id)"
                />
            </div>
        </div>
        <AlarmAdd
            :visible="alarmAdd.visible"
            :close="() => alarmAdd.visible = false"
            :register="v => addAlarm(v)"
        />
    </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import AlarmItem from "@/components/AlarmItem.vue";
import AlarmAdd from "@/components/AlarmAdd.vue";
import api from "@/api/alarms.js";
export default {
    name: "Alarm",
    components: { AlarmItem, AlarmAdd, Menu },
    data() {
        const useTestData = false;
        return {
            alarms: !useTestData ? [] : [
                { id: this.randomString(), hour: 7, minute: 21, description: "Go to school." },
                { id: this.randomString(), hour: 8, minute: 10, description: "Buy bread." },
            ],
            alarmsDeleting: [],
            alarmAdd: { visible: false },
            isEditing: false,
            changed: false,
        };
    },
    mounted() {
        const TIMER_KEY = "saveAlarmTimer";
        clearInterval(localStorage.getItem(TIMER_KEY))
        localStorage.setItem(TIMER_KEY, setInterval(() => {
            if (this.changed) {
                api.saveAlarms(this.alarms);
                this.changed = false;
            }
        }, 2000));
        api.loadAlarms(data => {
            this.alarms = data;
        });
    },
    watch: {
        alarms(alarms) {
            if (alarms.length == 0) {
                this.isEditing = false;
            }
        }
    },
    methods: {
        addAlarm(alarm) {
            alarm.id = this.randomString();
            alarm.description = alarm.description || "　";
            this.alarmAdd.visible = false;
            this.alarms.push(alarm);
            this.changed = true;
        },
        removeAlarm(id) {
            let removing = this.alarms.find(v => v.id == id);
            removing.offset = this.alarms.findIndex(v => v.id == id);
            this.alarmsDeleting.push(removing);
            this.alarms = this.alarms.filter(v => v.id != id);
            this.changed = true;
        },
        switchAlarm(id, enabled) {
            this.alarms.find(v => v.id == id).enabled = enabled;
            this.changed = true;
        },
        randomString() {
            return [...Array(32)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
        },
    },
};
</script>

<style scoped>
.alarm {
    height: 100%;
}
.alarm-items {
    padding-left: 12px;
    position: relative;
    height: 100%;
}
</style>