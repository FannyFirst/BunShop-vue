<template>
    <div style="margin-bottom: 60px">
        <van-nav-bar fixed style="height: 60px" >
            <template #title >
                <div style="font-size: 20px;display: flex">
                    <van-image height="30px" width="30px" :src="require('../assets/bun.png')"/>
                    <b>包 子 铺</b>
                </div>

            </template>
        </van-nav-bar>

        <BunsList v-if="active===0"/>
        <History v-else/>

        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o">主页</van-tabbar-item>
            <van-tabbar-item icon="user-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
  import BunsList from "./BunsList";
  import History from "./History";
  import {userLogin} from "../network/api";

  export default {
    name: "index",
    data() {
      return {
        active: 0
      }
    },
    methods: {

    },
    components: {
      BunsList,
      History
    },
    beforeCreate() {
      userLogin(this.$cookies.get("uid")).then(value => {
        this.$cookies.set("uid", value.data)
      })
    }
  }
</script>

<style scoped>

</style>