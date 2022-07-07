<template>
    <footer>
        <div class="starArea">
            <div>©2022 - 2022 By Linxae</div>
            <a
                data-v-7ac29aa2=""
                href="https://beian.miit.gov.cn/"
                target="_blank"
                style="color: #fff"
            >
                蜀ICP备2022014161号
            </a>
            <div class="star" v-for="item in starCount"></div>
        </div>
    </footer>
</template>

<script lang="ts" setup>
import useStarBc from "../../hooks/footer/useStarBc";

let starCount = useStarBc();
</script>

<style lang="scss">
footer {
    position: relative;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 16px;
    color: #fff;
    background-image: linear-gradient(
        125deg,
        #2c3e50,
        #27ae60,
        #2980b9,
        #e74c3c,
        #8e44ad
    );
    background-size: 400%;
    animation: bganimation 15s infinite;
}
@keyframes bganimation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>