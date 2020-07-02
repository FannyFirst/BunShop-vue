<template>
    <div>
        <van-nav-bar fixed style="height: 60px" @click-right="opening=!opening" @click-left="opening = 0">
            <template #left v-if="opening&&active===0">
                <transition name="fade-s">
                    <van-button round plain type="info" size="small">
                        取消
                    </van-button>
                </transition>
            </template>
            <template #title>
                <div style="font-size: 20px;display: flex">
                    <van-image height="30px" width="30px" :src="require('../../assets/bun.png')"/>
                    <b>包 子 铺</b>
                </div>
            </template>
            <template #right>
                <transition name="fade-s">
                    <van-button v-if="active===0" round type="info" size="small"
                                :color="opening?'linear-gradient(to right, #1DDA7B, #1DDAA1)':'linear-gradient(to right, #4bb0ff, #6149f6)'">
                        {{opening?"完成":"添加"}}
                    </van-button>
                </transition>
            </template>
        </van-nav-bar>
        <div class="content">
            <div v-if="active===0">
                <transition name="fade">
                    <AddBuns :finished="opening" v-show="opening"/>
                </transition>
                <BunsList_m :refreshHook="opening"/>
            </div>
            <div v-else-if="active===1">
                <Cart/>
            </div>
            <div v-else>
                <Manage/>
            </div>
        </div>


        <van-tabbar v-model="active">
            <van-tabbar-item icon="shop-o">商家</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart-o">购买</van-tabbar-item>
            <van-tabbar-item icon="manager-o">管理</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
  import AddBuns from "./AddBuns";
  import BunsList_m from "./BunsList_m";
  import Cart from "./Cart";
  import Manage from "./Manage";


  export default {
    name: "index",
    data() {
      return {
        active: 0,
        opening: false
      }
    },
    methods: {},
    created() {
      console.log(11111111111)
    },
    components: {
      AddBuns,
      BunsList_m,
      Cart,
      Manage
    }
  }
</script>

<style scoped>

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s, margin-top .2s;
    }

    .fade-enter, .fade-leave-to {
        margin-top: -182px;
        opacity: 0;
    }

    .fade-s-enter-active, .fade-s-leave-active {
        transition: opacity .2s;
    }

    .fade-s-enter, .fade-s-leave-to {
        opacity: 0;
    }

    .content {
        margin-bottom: 50px;
    }


</style>