<template>
    <div>
        <van-row>
            <van-col span="5">
                <van-sidebar v-model="activeKey" @change="onChange">
                    <div v-for="(item,index) in list" :key="index">
                        <van-sidebar-item :title="item.name"/>
                    </div>
                </van-sidebar>
            </van-col>

            <van-col span="19">
                <div>
                    <van-card
                            v-for="(item) in buns" :key="item.id"
                            :num="item.num"
                            :price="item.price"
                            :title="item.name"
                            :desc="'有'+item.num+'个'+item.name+'等你来买哦'"
                            :thumb="require(item.pic_url===0?'../assets/v_buns.jpg':'../assets/m_buns.jpg')"
                    >
                        <template #footer>
                            <van-stepper v-model="item.selectedNum" min="0" :max="item.num"/>
                        </template>
                    </van-card>
                </div>

            </van-col>
        </van-row>


        <van-button class="cart" icon="cart-o" round type="info"
                    color="linear-gradient(to right, rgb(244, 197, 110), rgb(233, 32, 32))"
                    @click="cartHandler"/>
        <van-popup v-model="show" round position="bottom" :style="{ max_height: '60%',paddingBottom:'50px' }">
            <van-card
                    v-for="item in cart" :key="item.name"
                    :num="item.selectedNum"
                    :price="item.price"
                    :desc="'这'+item.selectedNum+'个'+item.name+'等你来买呢'"
                    :title="item.name"
                    :thumb="require(item.pic_url===0?'../assets/v_buns.jpg':'../assets/m_buns.jpg')"
            >
                <template #footer>
                    <van-stepper v-model="item.selectedNum" min="0" @plus="totalPrice+=item.price*100"
                                 @minus="totalPrice-=item.price*100" :max="item.num"/>
                </template>
            </van-card>
            <van-submit-bar :price="totalPrice" button-text="支付" @submit="onSubmit"/>
        </van-popup>
        <van-overlay :show="showNumCard" class="wrapper" @click="stopNotify">
            <div class="block wrapper" @click.stop>

                <div>{{noting?"取包子":"您的包子号是"}}<br/>
                    <span class="queueIndex">
                        {{bunsNum}}
                    </span><br>

                    <div>
                        <van-switch active-color="#07c160" v-model="note" size="24px"/>
                        <div>开启震动通知</div>
                    </div>

                </div>
            </div>

        </van-overlay>
    </div>
</template>

<script>
  import {bunsList, buy, buyReady, buyingCheck} from "../network/api"
  import {Dialog, Toast} from "vant"

  export default {
    name: "BunsList",
    watch: {
      note() {
        this.stopNotify()
      }
    },
    data() {
      return {
        activeKey: 0,
        show: false,
        showNumCard: false,
        list: [{name: "所有包子"}, {name: "菜包子"}, {name: "肉包子"}],
        buns: [],
        cart: [],
        totalPrice: 0,
        note: true,
        vibrate: undefined,
        asking: undefined,
        noting: false,
        bunsNum: 0,
        needReload: false
      };
    },
    methods: {
      onLoad(index = -1) {
        bunsList().then(value => {
          const data = value.data.map(value => {
            value['selectedNum'] = 0
            return value
          }).filter(value=>value.num>0)

          if (index === -1) this.buns = data
          else if (index === 0) this.buns = data.filter(value => value.pic_url === 0)
          else this.buns = data.filter(value => value.pic_url === 1)
        })
      },
      onChange(index) {
        this.onLoad(index - 1)
      },
      onSubmit() {
        if (this.cart.length)
          Dialog.alert({
            title: '示例支付',
            message: '未实际调用支付接口，仅仅作为示例，接下来你可以拿到你的取餐号了！',
          }).then(() => {
              const cart = []
              this.cart.forEach((value => {
                cart.push({index: value.index, num: value.selectedNum})
              }))
              if (typeof this.asking === "undefined") {
                buy(cart, this.$cookies.get('uid'), this.totalPrice).then(value => {
                  if (value.code === 10000) {
                    this.bunsNum = value.data + 1
                    this.setAsking(value.data)
                    this.showNumCard = true
                    this.show = false
                  } else if (value.code === 30000) {
                    Toast("包子卖完了呢")
                  } else {
                    Toast("购买失败")
                  }
                })
                this.onLoad(this.activeKey - 1)
              }
            });

      },
      cartHandler() {
        if (typeof this.asking !== "undefined") {
          Toast("你的这个订单没有完成！不可以购买")
          this.show = false
          this.showNumCard = true
        } else {

          this.totalPrice = 0
          this.cart = []
          this.buns.reduce((pre, cur, index) => {
            if (cur["selectedNum"] > 0) {
              pre.push(Object.assign(cur, {index}))
              this.totalPrice += cur.price * cur.selectedNum
            }
            return pre
          }, this.cart)
          this.totalPrice *= 100
          if (this.cart.length <= 0)
            Toast("选一点包子再买嘛！")
          else this.show = !this.show
        }
      },
      setAsking(buyID) {
        this.asking = setInterval(() => {
          buyReady(buyID).then(value1 => {
            if (value1.code === 10000) {
              this.notifyUser()
              clearInterval(this.asking)
              this.needReload = true
            } else if (value1.code !== 40001) {
              console.error("业务逻辑有问题！！")
            }
          })
        }, 3000)

      },
      notifyUser() {
        this.noting = true
        this.showNumCard = true
        this.show = false

        if (this.note) {
          if (window.navigator.vibrate) {
            this.vibrate = setInterval(() => {
              window.navigator.vibrate(500);
            }, 1000)
          } else {
            console.error("此设备不支持震动！！")
          }
        }
      },
      stopNotify() {
        this.showNumCard = false
        clearInterval(this.vibrate)
        if (this.needReload) {
          Object.assign(this.$data, this.$options.data())
        }
        this.onLoad()
      },
      checkBuying() {
        buyingCheck(this.$cookies.get('uid')).then(value => {
          if (value.code === 10000) {
            this.bunsNum = -1
          } else if (value.code === 40002) {
            this.bunsNum = value.data + 1
            this.setAsking(value.data)
            this.showNumCard = true
          }
        })
      }
    }
    ,
    created() {
      this.onLoad()
      this.checkBuying()
    }
  }
</script>

<style scoped>
    .cart {
        box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
        position: fixed;
        bottom: 70px;
        right: 30px;
    }

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        z-index: 999;

    }

    .block {
        width: 80%;
        height: 70%;
        border-radius: 20px;
        background: linear-gradient(to right, #5f2c82, #49a09d);
        color: #fff;
    }

    .queueIndex {
        font-weight: 900;
        font-size: 150px;
    }

</style>