<template>
    <div>
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
    </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import AlarmItem from "@/components/AlarmItem.vue";
import AlarmAdd from "@/components/AlarmAdd.vue";
export default {
    name: "Alarm",
    components: { AlarmItem, AlarmAdd, Menu },
    data() {
        return {
            alarms: [
                { id: this.randomString(), hour: 7, minute: 21, description: "Go to school." },
                { id: this.randomString(), hour: 8, minute: 10, description: "Buy bread." },
            ],
            alarmAdd: { visible: false },
            isEditing: false,
        };
    },
    methods: {
        addAlarm(alarm) {
            alarm.id = this.randomString();
            alarm.description = alarm.description || "　";
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
.alarm-items {
    padding-left: 12px;
}
</style>