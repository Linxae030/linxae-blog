<template>
    <nav>
        <div class="logo">Explore.</div>
        <div class="nav-links">
            <ul>
                <li @click="$router.go(0)">
                    <img src="../../assets/img/home//linkedin.png" alt="" />
                    首页
                </li>
                <li>
                    <img src="../../assets/img/home//facebook.png" alt="" />
                    发现
                </li>
                <li>
                    <img
                        src="../../assets/img/home//instagram-logo.png"
                        alt=""
                    />
                    娱乐
                </li>
                <li>
                    <img
                        src="../../assets/img/home//instagram-logo.png"
                        alt=""
                    />
                    友链
                </li>
                <li>
                    <img
                        src="../../assets/img/home//instagram-logo.png"
                        alt=""
                    />
                    留言
                </li>
                <li>
                    <img
                        src="../../assets/img/home//instagram-logo.png"
                        alt=""
                    />
                    登录
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss">
nav {
    position: fixed;
    z-index: 100;
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
    background-color: rgba($color: black, $alpha: 0.7);
    color: white;
    backdrop-filter: blur(50px);
    .nav-links {
        display: flex;
        align-items: center;
        margin-right: 30px;
        ul {
            display: flex;
            flex-direction: row;
            align-items: center;
            li {
                list-style: none;
                width: 90px;
                display: flex;
                align-items: center;
                font-size: 18px;
                cursor: pointer;
                img {
                    transform: scale(0.45);
                }
            }
        }
    }
    .logo {
        font-weight: 600;
        font-size: 18px;
    }
}
</style>