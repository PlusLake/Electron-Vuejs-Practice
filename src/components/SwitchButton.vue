<template>
    <div class="switch" @click="switched(!value)" :class="{ 'on' : value }"/>
</template>

<script>
export default {
    name: "SwitchButton",
    props: {
        switches: Function,
        switched: Function,
        value: Boolean,
    },
};
</script>

<style scoped>
.switch {
    cursor: pointer;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 50px;
    height: 30px;
    max-width: 100%;
    background-color: #262629;
    border-radius: 100px;
    transition: background-color .2s;
}

.switch::before {
    content: "";
    display: block;
    position: absolute;
    left: 5%;
    top: 10%;
    width: 50%;
    height: 80%;
    background: #FFF;
    border-radius: 100%;
    transition: all .2s;
}

.switch.on {
    background: #30d158;
}

.switch.on::before {
    margin-left: 40%;
}
</style>