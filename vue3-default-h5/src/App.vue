<template>
  <div id="app">
    <transition :name="animate">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      animate: "",
    }
  },
  watch: {
    $route(v, from) {
      this.animate = v.meta.index > from.meta.index ? "slide-left" : "slide-right";
    },
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  will-change: transform;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  width: 100%;
  height: 100%;
  position: fixed;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}
</style>
