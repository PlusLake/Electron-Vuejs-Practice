<template>
    <div class="option">
        <div class="inner">
            <div v-if="type != 'Text'" class="arrow">＞</div>
            <div v-if="type == 'Text'">
                <input maxlength="32" spellcheck="false" v-model="local"/>
            </div>
            {{ title }}
        </div>
    </div>
</template>

<script>
export default {
    name: "Option",
    props: {
        title: String,
        type: String,
        value: String,
    },
    data() {
        return {
            local: "",
        };
    },
    watch: {
        value(v) {
            this.$emit("input", v);
        },
        local(v) {
            this.$emit("input", v);
        }
    },
    mounted() {
        this.local = this.value;
    },
    methods: {
        get() {
            return this.value;
        },
        set(v) {
            this.local = v;  
        },
        update(v) {
            this.local = v;
            this.$emit('input', v);
        }
    },
};
</script>

<style scoped>
.option {
    background-color: #131313;
    padding: 0px 0px 0px 16px;
    font-size: 20px;
    line-height: 40px;
    position: relative;
}
.option:hover {
    background-color: #262626;
    cursor: pointer;
}
.option .inner {
    border-bottom: 1px solid #262626;
}
.option .arrow {
    display: inline-block;
    position: absolute;
    right: 8px;
    color: #636366;
}
input {
    color: #636366;
    background-color: transparent;
    border: none;
    display: inline-block;
    position: absolute;
    right: 8px;
    height: 100%;
    width: 50%;
    font-size: 16px;
    text-align: right;
    padding-right: 32px;
    text-overflow: ellipsis;
    white-space: nowrap;
}
input:focus{
    outline: none;
}
</style>

