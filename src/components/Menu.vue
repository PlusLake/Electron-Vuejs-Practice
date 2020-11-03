<template>
    <div class="menu">
        <div class="button left" @click="left.onClick()">{{ left.text }}</div>
        <div class="button right" @click="right.onClick()">{{ right.text }}</div>
        <div class="title">{{ title }}</div>
    </div>
</template>

<script>
export default {
    name: "Menu",
    props: {
        title: String,
        left: Object,
        right: Object,
    },
};
</script>

<style scoped>
.menu {
    background-color: #131313;
    border-bottom: solid 1px #262626;
    font-family: "medium";
    font-size: 16px;
    text-align: center;
    padding: 4px;
    -webkit-app-region: drag;
    position: relative;
}
.menu .button {
    color: #FF9500;
    font-size: 24px;
    border: none;
    cursor: pointer;
    padding: 0px 16px;
    -webkit-app-region: no-drag;
    display: inline-block;
    font-family: "medium";
}
.menu .left {
    position: absolute;
    left: 0px;
    bottom: 4px;
}
.menu .right {
    position: absolute;
    right: 0px;
    bottom: 4px;
}
.menu .title {
    font-family: "medium";
    font-size: 24px;
}
</style> 