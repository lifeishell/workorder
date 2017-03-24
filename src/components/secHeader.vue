<template>
    <div class="head-wrapper">
        <div class="head">
            <div class="acl_logo"></div>
            <div class="user-status">
                <ul>
                    <li class="name" id="username">欢迎您，xxxxx
                        <span class="dwn">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </li>
                    <li class="logout js-logout"><a href="/admin/logout">退出</a></li>
                </ul>
            </div>

            <div class="nav clearfix">
                <ul>
                    <li class="active">
                        <a href="/">首页</a>
                    </li>
                    <li>
                        <a href="https://sec.corp.qihoo.net/index.php?title=SecRules" target="_blank">信息安全条例</a>
                    </li>
                    <li>
                        <a href="#">安全编码规范</a>
                    </li>
                    <li>
                        <a href="/faq">公司安全策略FAQ</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
            }
        }
    }
</script>
<style lang="sass">
</style>