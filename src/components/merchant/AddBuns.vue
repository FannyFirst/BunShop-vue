<template>
    <div>
        <van-cell-group>
            <van-field v-model="name" label="名称" placeholder="输入包子名称"/>
            <van-cell center title="是否肉包子" style="text-align: left">
                <template #right-icon>
                    <van-switch v-model="checked" size="24"/>
                </template>
            </van-cell>
            <van-field :formatter="formatter" v-model="price" type="number" label="单价"/>

            <van-cell center title="包子数量" style="text-align: left">
                <template #right-icon>
                    <van-stepper v-model="num" integer min="1" max="999"/>
                </template>
            </van-cell>
        </van-cell-group>
    </div>

</template>

<script>
  import {addBuns} from "../../network/api";

  // import Notify from "vant/lib/notify";
  // import Toast from "vant";

  import {Toast} from "vant";

  export default {
    name: "AddBuns",
    props: ["finished"],
    watch: {
      finished(newValue) {
        if (newValue === false && this.checkInput())//存在三种状态0,true和false
          addBuns({
            name: this.name,
            price: this.price,
            type: this.checked ? 1 : null,
            num: this.num
          }).then(() => {
            Toast('添加成功');
            Object.assign(this.$data, this.$options.data())
          })
      }
    },
    data() {
      return {
        checked: false,
        price: 0,
        name: "",
        num: 1
      }
    },
    methods: {
      formatter(value) {
        if (value[value.length - 1] !== "." && Number(value).toString().length !== value.length) return Number(value)
        const matched = value.match(/(\d+\.?\d{0,2})/)
        return matched ? matched[0] : null
      },
      checkInput() {
        if (this.price <= 0) {
          Toast('价格不能为0');
          return false
        }
        if (this.name === null || this.name.length < 1) {
          Toast('名称不能为空');
          return false
        }
        return true

      }
    }
  }
</script>

<style scoped>

</style>