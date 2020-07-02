<template>
    <div>
        <van-swipe-cell v-for="(item,index) in list" :key="item.start">
            <van-divider v-show="!item['ready']">用户{{item.uid}}</van-divider>
            <van-card
                    v-show="!item['ready']"
                    v-for="(bun,id) in item.buns" :key="id"
                    :num="bun.num"
                    :price="bun.price"
                    :title="bun.name"
                    :desc="'有'+bun.num+'个'+bun.name+'等你来买哦'"
                    :thumb="require(bun.pic_url===0?'../../assets/v_buns.jpg':'../../assets/m_buns.jpg')"
            />
            <template #right>
                <van-button v-show="!item['ready']" square text="完成" type="primary" class="primary-button"
                            @click="confirm(index)"/>
            </template>
        </van-swipe-cell>

    </div>
</template>

<script>
  import {buyingList, buyingConfirm} from '../../network/api'
  import {Toast} from "vant";

  export default {
    name: "Cart",
    data() {
      return {
        list: [],
        rollRequest: undefined
      }
    },
    methods: {
      confirm(index) {
        buyingConfirm(index).then(value => {
          if(value.code===10000){
            Toast("确认成功！")
          }
        })
      },
      refreshList() {
        buyingList().then(value => {
          // console.log(value)
          this.list = value
        })
      },startInterval(){
        this.rollRequest = setInterval(() => {
          this.refreshList()
        }, 1000)
      },stopInterval(){
        clearInterval(this.rollRequest)
      }
    },
    created() {
      this.startInterval()
    },
    beforeDestroy() {
      this.stopInterval()
    }
  }
</script>

<style scoped>
    .primary-button {
        height: 100%;
    }
</style>