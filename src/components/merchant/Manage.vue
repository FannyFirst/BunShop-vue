<template>
    <div>
        <van-grid :column-num="3">
            <van-grid-item icon="user-o" :text="'用户数：'+users.length"/>
            <van-grid-item icon="cash-on-deliver" :text="'总收入：'+totalAmount/100"/>
            <van-grid-item icon="completed" :text="'完成交易：'+list.length"/>
        </van-grid>
        <div v-for="(item) in list" :key="item.start">
            <van-card
                    v-for="(bun,id) in item.buns" :key="id"
                    :num="bun.num"
                    :price="bun.price"
                    :title="bun.name"
                    :desc="'买了'+bun.num+'个'+bun.name+'哦'"
                    :thumb="require(bun.pic_url===0?'../../assets/v_buns.jpg':'../../assets/m_buns.jpg')"

            />
            <van-divider> 收入￥{{item['money']/100}}</van-divider>
        </div>
    </div>
</template>

<script>
  import {orderList,userList} from "../../network/api";

  export default {
    name: "Manage",
    data() {
      return {
        list: [],
        totalAmount: 0,
        users:[]
      }
    },
    methods: {
      dateFormat(timestamp) {
        const date = new Date(parseInt(timestamp) * 1000)
        let res = date.getMonth() + 1
        res += "/" + date.getDate()
        res += " " + date.getHours()
        res += ":" + date.getMinutes()
        return res
      }
    },
    created() {
      userList().then(value => {
        this.users = value.data
      })
      orderList().then(value => {
        this.list = value.data
        this.totalAmount = this.list.reduce((pre, cur) => pre + cur['money'], 0)
      })
    }
  }
</script>

<style scoped>

</style>