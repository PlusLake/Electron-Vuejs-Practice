<style scoped>
.frame {
    border-bottom: 1px solid #262626;
    padding: 8px 0px 8px 8px;
}
.time {
    font-size: 64px;
    line-height: 64px;
    font-family: "light";
    margin-bottom: -12px;
}
.description {
    font-size: 20px;
    font-family: "regular";
}
.colon {
    font-family: "round";
    font-size: 48px;
    position: relative;
    top: -8px;
}
.button {
    position: absolute;
    right: 16px;
    top: 40px;
}
</style>

<template>
    <div class="frame">
        <div class=time>
            {{ hour }}<span class="colon">:</span>{{ minute }}
        </div>
        <div class="description">
            {{ description }}
        </div>
        <SwitchButton class="button" v-model="enabled" />
    </div>
</template>

<script>
import SwitchButton from "@/components/SwitchButton.vue";

export default {
    name: "AlarmItem",
    components: {
        SwitchButton
    },
    data() {
        return {
            enabled: false,
        }
    },
    props: {
        hour: Number,
        minute: Number,
        description: String,
    },
    methods: {
    },
};
</script>
