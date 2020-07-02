<template>
    <div>
        <van-list
                v-model="loading"
                :error.sync="error"
                error-text="没有更多了~"
                @load="onLoad">
            <van-swipe-cell v-for="(item,index) in list" :key="item.id">
                <van-card
                        :num="item.num"
                        :price="item.price"
                        :title="item.name"
                        :desc="'有'+item.num+'个'+item.name+'等你来买哦'"
                        :thumb="require(item.pic_url===0?'../../assets/v_buns.jpg':'../../assets/m_buns.jpg')"
                />
                <template #right>
                    <van-button square type="danger" text="删除" @click="delBun(item.name,index)" class="side_button"/>
                </template>
            </van-swipe-cell>

        </van-list>
    </div>
</template>

<script>
  import {bunsList, delBuns} from "../../network/api";
  import {Dialog, Toast} from "vant";

  export default {
    name: "BunsList_m",
    props: ["refreshHook"],
    watch: {
      refreshHook(newValue) {
        if (!newValue) {
          this.onLoad()
        }
      }
    },
    data() {
      return {
        list: [{
          pic_url: 1,
          name: "",
          price: 1.0,
          num: 1
        }],
        error: true,
        loading: false,
      }
    },
    methods: {
      onLoad() {
        bunsList().then(value => {
          this.list = value.data
          this.loading = false
          this.error = true
        })
      }, delBun(name, index) {
        Dialog.confirm({
          title: '确认删除？',
          message: '将删除' + name,
        }).then(() => {
          delBuns(index).then(value => {
            console.log(index,value)
            if (value) Toast("删除成功！")
            else Toast("删除失败！")
            this.onLoad()
          })
        }).catch(() => {
          //nothing to do
        })

      }
    },
    created() {
      bunsList().then(value => {
        this.list = value.data
      })
    }
  }
</script>

<style scoped>
    .side_button {
        height: 100%;
    }

</style>