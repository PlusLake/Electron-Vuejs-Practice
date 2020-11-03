<template>
    <div class="footer">
        <Stopwatch
            class="icon"
            @click.native="menu('Stopwatch')"
            :class="{ 'icon-enabled' : value == 'Stopwatch' }"
        />
        <Alarm
            class="icon"
            @click.native="menu('Alarm')"
            :class="{ 'icon-enabled' : value == 'Alarm' }"
        />
        <Setting
            class="icon"
            @click.native="menu('Setting')"
            :class="{ 'icon-enabled' : value == 'Setting' }"
        />
        <Shutdown
            class="icon"
            @click.native="menu('Shutdown')"
            :class="{ 'icon-enabled' : value == 'Shutdown' }"
        />
    </div>
</template>

<script>
import Alarm from "@/assets/svg/Alarm.vue";
import Setting from "@/assets/svg/Setting.vue";
import Stopwatch from "@/assets/svg/Stopwatch.vue";
import Shutdown from "@/assets/svg/Shutdown.vue";
export default {
    name: "Footer",
    components: { Alarm, Setting, Stopwatch, Shutdown },
    props: {
        value: String,
    },
    methods: {
        menu(v) {
            console.log(v)
            this.$emit('input', v);
        },
    },
};
</script>

<style scoped>
.footer {
    border-top: 1px solid #262626;
    position: fixed;
    height: 64px;
    bottom: 0px;
    color: #fff;
    width: 100%;
    background-color: #131313;
    z-index: 10;
    text-align: center;
}
.icon {
    cursor: pointer;
    fill: #262626;
    transform-origin: top center;
    transform: scale(2.5, 2.5);
    position: relative;
    margin: 0px 32px;
    top: 10px;
}
.icon-enabled {
    fill: #FF9500;
}
</style>