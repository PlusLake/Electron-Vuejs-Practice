<template>
    <div class="alarm-item"
        :class="{ 'removing' : removing }"
        :style="`top: ${ 109 * offset }px;`"
        v-on:animationend="() => removed(id)"
    >
        <div class="inner">
            <div class="edit" :class="{ 'edit-enabled' : isEditing }">
                <div class="delete"
                    @click="remove(id)"
                    :style="`transform: translate(${ isEditing ? 32 : 0 }px, 0px); display: ${ removing ? 'none' : 'inline-block' };`"
                />
            </div>
            <div class=time :style="`transform: translate(${isEditing ? 32 : 0}px, 0px);`">
                {{ hour }}<span class="colon">:</span>{{ (minute + "").padStart(2, "0") }}
            </div>
            <div class="description" :style="`transform: translate(${isEditing ? 32 : 0}px, 0px);`">
                {{ description }}
            </div>
            <SwitchButton class="button" v-model="enabled" />
        </div>
    </div>
</template>

<script>
import SwitchButton from "@/components/SwitchButton.vue";

export default {
    name: "AlarmItem",
    components: {
        SwitchButton
    },
    props: {
        id: String,
        hour: Number,
        minute: Number,
        description: String,
        isEditing: Boolean,
        remove: Function,
        offset: Number,
        removing: Boolean,
        removed: Function,
    },
    data() {
        return {
            enabled: false,
        }
    },
};
</script>

<style scoped>
.alarm-item {
    position: absolute;
    width: 100%;
    border-bottom: 1px solid #262626;
    transition: ease-in-out 200ms;
}
.alarm-item .inner {
    position: relative;
    padding: 8px 0px 8px 8px;
}
.time {
    font-size: 64px;
    line-height: 64px;
    font-family: "light";
    margin-bottom: -12px;
    display: inline-block;
    transition: ease-in-out 200ms;
}
.description {
    font-size: 20px;
    font-family: "regular";
    transition: ease-in-out 200ms;
}
.colon {
    font-family: "round";
    font-size: 48px;
    position: relative;
    top: -8px;
}
.button {
    position: absolute;
    right: 28px;
    top: 40px;
}
.edit {
    width: 0px;
    transition: ease-in-out 200ms;
    display: inline-block;
    position: absolute;
    left: 0px;
}
.edit-enabled {
    width: 32px;
}
.delete {
    width: 20px;
    height: 20px;
    border-radius: 12px;
    background-color: #FF3B30;
    display: inline-block;
    position: absolute;
    left: -36px;
    top: 36px;
    transition: ease-in-out 200ms;
    cursor: pointer;
}
.delete::before {
    content: "ー";
    font-family: "medium";
    position: relative;
    left: 2px;
    top: -1px;
}
.removing {
    animation: ease-in-out 300ms forwards removing;
}
@keyframes removing {
    from {
        opacity: 1;
        left: 12px;
    }
    to {
        opacity: 0;
        left: 100%;
    }
}
</style>