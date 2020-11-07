<template>
    <div class="frame" :class="{ 'frame-visible' : visible }">
        <Menu
            :title="'New alarm'" 
            :left="{ text: 'Cancel', onClick: () => close() }"
            :right="{ text:'Register', onClick: () => addNewAlarm() }"
        />
        <div class="select-time">
            <div class="inner hour" @wheel="scrollHour">
                <div class="item" :class="{ 'visible' : isNearBy(hour, i - 1, 24)  }" :style="`top: ${ calculateY(i, y[0], 24) }px`" v-for="i in 24" :key="i">
                    {{ (i - 1) % 24 }}
                </div>
            </div>
            <div class="inner minute" @wheel="scrollMinute">
                <div class="item" :class="{ 'visible' : isNearBy(minute, i - 1, 60)  }" :style="`top: ${ calculateY(i, y[1], 60)}px`" v-for="i in 60" :key="i">
                    {{ ((i - 1) + "").padStart(2, "0") }}
                </div>
            </div>
            <div class="current"/>
            <div class="overlay overlay-top"/>
            <div class="overlay overlay-bottom"/>
        </div>
        <Option :title="'Description'" :type="'Text'" v-model="description"/>
        <Option :title="'Ringtone'"/>
    </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import Option from "@/components/Option.vue";
export default {
    name: "AlarmAdd",
    components: {
        Menu, Option
    },
    props: {
        visible: Boolean,
        close: Function,
        register: Function,
    },
    data() {
        return {
            y: [36 * 5, 36 * 5],
            hour: 0,
            minute: 0,
            description: "",
        };
    },
    watch: {
        visible(v) {
            if (v) {
                this.y = [36 * 5, 36 * 5];
                this.hour = this.minute = 0;
                this.description = "";
            }
        }
    },
    mounted() {
        clearInterval(localStorage.getItem("scrollTimer"));
    },
    methods: {
        scrollHour(e) {
            this.scroll(e, 0);
        },
        scrollMinute(e) {
            this.scroll(e, 1);
        },
        scroll(e, i) {
            this.y[i] += 36 * (e.wheelDelta > 0 ? 1 : -1);
            let hour = Math.round((this.y[0] / 36) % 24);
            this.hour = ((hour < 0 ? Math.abs(hour) : 24 - hour) + 5) % 24;
            let minute = Math.round((this.y[1] / 36) % 60);
            this.minute = ((minute < 0 ? Math.abs(minute) : 60 - minute) + 5) % 60;
            e.preventDefault();
        },
        calculateY(i, coordinate, SIZE) {
            const ROW_HEIGHT = 36;
            const TOTAL_HEIGHT = ROW_HEIGHT * SIZE;
            let temp = coordinate + ROW_HEIGHT * i - ROW_HEIGHT;
            temp %= TOTAL_HEIGHT;
            return temp < -TOTAL_HEIGHT / 2 ? temp + TOTAL_HEIGHT : temp % TOTAL_HEIGHT;
        },
        isNearBy(a, b, SIZE) {
            a = Math.abs(a - SIZE / 2);
            b = Math.abs(b - SIZE / 2);
            return Math.abs(a - b) < 5;
        },
        addNewAlarm() {
            this.register({
                "hour"        : this.hour,
                "minute"      : this.minute,
                "description" : this.description,
            });
        }
    },
};
</script>

<style scoped>
.frame {
    position: absolute !important;
    bottom: -100%;
    left: 0px;
    background-color: #000;
    height: 100%;
    width: 100%;
    transition: bottom 500ms ease-in-out;
    z-index: 20;
}
.frame-visible {
    bottom: 0%;
}
.select-time {
    height: calc(9 * 36px);
    overflow: hidden;
    border-bottom: 1px solid #262626;
    position: relative;
}
.select-time .current {
    position: absolute;
    top: calc(4 * 36px);
    height: 36px;
    width: 100%;
    opacity: 1;
    background-color: #131313;
    pointer-events: none;
    z-index: 5;
}
.select-time .inner {
    font-size: 24px;
    width: 50%;
    height: 100%;
    overflow: visible;
    position: relative;
    display: inline-block;
    box-sizing: content-box;
    scrollbar-width: none;
    transform: translate(0, -36px);
    z-index: 6;
}
.select-time .inner .item {
    visibility: hidden;
    position: absolute;
    top: 0px;
    width: 100%;
    opacity: 0.0;
}
.select-time .inner .visible {
    visibility: visible;
    opacity: 1.0;
}
.select-time .hour .item {
    text-align: right;
    right: 8px;
}
.select-time .minute .item {
    left: 8px;
}
.select-time .inner::-webkit-scrollbar { 
    display: none;
}
.select-time .overlay {
    width: 100%;
    height: 128px;
    position: absolute;
    pointer-events: none;
    z-index: 7;
}
.select-time .overlay-top {
    background: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    top: 0px;
}
.select-time .overlay-bottom {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    bottom: 0px;
}
</style>