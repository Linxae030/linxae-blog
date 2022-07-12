<template>
    <div class="card-container">
        <div class="card-personal">
            <h1>Linxaeの妙妙屋</h1>
            <div class="card-avatar">
                <img src="@/assets/img/home/avatar.jpg" alt="" />
            </div>
            <ul class="card-statistics">
                <li class="articles-num">
                    <span class="num">114</span>
                    <span class="tag">文章</span>
                </li>
                <li class="pic-num">
                    <span class="num">114</span>
                    <span class="tag">图片</span>
                </li>
                <li class="note-num">
                    <span class="num">114</span>
                    <span class="tag">笔记</span>
                </li>
            </ul>
            <div class="card-social-links">
                <li
                    class="iconfont icon-QQ"
                    style="color: rgb(66, 170, 237)"
                ></li>
                <li>
                    <img
                        src="@/assets/iconfont/gitee.png"
                        alt=""
                        style="width: 31px; height: 31px"
                    />
                </li>
                <li>
                    <img
                        src="@/assets/iconfont/网易云音乐.png"
                        alt=""
                        style="width: 40px; height: 40px"
                    />
                </li>
                <li
                    class="iconfont icon-bilibili"
                    style="color: rgb(66, 170, 237)"
                ></li>
                <li class="iconfont icon-github" style="color: black"></li>
                <li>
                    <img
                        src="@/assets/iconfont/steam.png"
                        alt=""
                        style="width: 30px; height: 30px"
                    />
                </li>
            </div>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="card-friends-notice">
            <div class="friend-links-title">
                <img src="@/assets/iconfont/链接.png" alt="" />
                <span class="links-title-content">友链</span>
            </div>
            <div class="card-friend-links">
                <ul class="friend-list">
                    <li class="friend-item">
                        <img
                            class="avatar"
                            src="@/assets/iconfont/hch.png"
                            alt=""
                        />
                        <h1 class="id">hch</h1>
                    </li>
                    <li class="friend-item">
                        <img
                            class="avatar"
                            src="@/assets/iconfont/hch.png"
                            alt=""
                        />
                        <h1 class="id">hch</h1>
                    </li>
                    <li class="friend-item">
                        <img
                            class="avatar"
                            src="@/assets/img/home/avatar.jpg"
                            alt=""
                        />
                        <h1 class="id">Linxae</h1>
                    </li>
                    <li class="friend-item">
                        <img
                            class="avatar"
                            src="@/assets/img/home/avatar.jpg"
                            alt=""
                        />
                        <h1 class="id">Linxae</h1>
                    </li>
                    <li class="friend-item">
                        <img
                            class="avatar"
                            src="@/assets/img/home/avatar.jpg"
                            alt=""
                        />
                        <h1 class="id">Linxae</h1>
                    </li>
                    <li class="friend-item">
                        <img
                            class="avatar"
                            src="@/assets/img/home/avatar.jpg"
                            alt=""
                        />
                        <h1 class="id">Linxae</h1>
                    </li>
                </ul>
            </div>
            <div class="card-notice">
                <div class="card-notice-title">
                    <img src="@/assets/iconfont/喇叭.png" alt="" />
                    <span class="title-content">伟大的Linxae如是说道...</span>
                </div>
                <div class="card-notice-content">
                    <div class="notice-content">
                        伟大的Linxae如是说道..伟大的Linxae如是说道...伟大的伟大的Linxae如是说道...伟大的.伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...伟大的Linxae如是说道...
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/home/down-myCard.scss";
</style>