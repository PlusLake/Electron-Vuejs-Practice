<template>
    <div v-if="visible">
        <div class="overlay">
        </div>
        <div class="outer">
            <div class="message-box top">
                <div class="title">
                    {{ title }}
                </div>
                <div>
                    {{ content }}
                </div>
            </div>
            <div class="message-box bottom button">
                OK
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Messagebox",
    props: {
        title: String,
        content: String,
        visible: Boolean,
    }
};
</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    background-color: #000;
    z-index: 90;
    opacity: .75;
}

.outer {
    display: grid;
    justify-content: center;
    align-content: center;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    z-index: 91;
}

.message-box {
    background-color: #1C1C1E;
    color: #FFF;
    margin: auto;
    width: 256px;
    padding: 8px 16px;
    text-align: center;
}

.top {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.bottom {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}

.button {
    color: #FF9500;
    font-family: "medium";
}

.button:hover {
    background-color: #2C2C2E;
    cursor: pointer;
}

.title {
    font-family: "medium";
    font-size: 24px;
}
</style>