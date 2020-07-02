<template>

    <div id="app">
        <transition name="slide-fade">
            <router-view/>
        </transition>

    </div>
</template>

<script>


  export default {
    name: 'App',
    beforeCreate() {
      this.$cookies.config('30d')
    }
  }
</script>

<style>
    #app {
        /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
        font-family: "Microsoft YaHei UI", serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        transition: all .3s;
    }
</style>
