<template>
    <div>
        <div v-for="(item) in list" :key="item.start">
            <van-card
                    v-for="(bun,id) in item.buns" :key="id"
                    :num="bun.num"
                    :price="bun.price"
                    :title="bun.name"
                    :desc="'买了'+bun.num+'个'+bun.name+'哦'"
                    :thumb="require(bun.pic_url===0?'../assets/v_buns.jpg':'../assets/m_buns.jpg')"

            />
            <van-divider>{{dateFormat(item['created_at'])}} 消费￥{{item['money']/100}}</van-divider>
        </div>
    </div>
</template>

<script>
  import {userOrder} from "../network/api"

  export default {
    name: "History",
    data() {
      return {
        list: [],
        error: true,
        loading: false,
      }
    },
    methods: {
      onLoad() {
        userOrder(this.$cookies.get('uid')).then(value => {
          console.log(value);
          this.list = value.data
        })
      },
      dateFormat(timestamp) {
        const date = new Date(parseInt(timestamp) * 1000)
        let res = date.getMonth() + 1
        res += "/" + date.getDate()
        res += " " + date.getHours()
        res += ":" + date.getMinutes()
        return res
      }
    }, created() {
      this.onLoad()
    }
  }
</script>

<style scoped>

</style>