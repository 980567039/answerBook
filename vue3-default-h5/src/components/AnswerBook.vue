<template>
  <div>
    <p>请提出您的问题</p>
    <input v-model="question" type="text">
    <div>
      <span @click="getAnswer">答案</span> 
    </div>
  </div>
</template>

<script>
import { getAnswer } from '@/api'
export default {
  name:'',
  data(){
   return {
    question: ''
   }
  },
  methods: {
    async getAnswer() {
      getAnswer({ question: this.question }).then(res => {
        console.log(res)
      })
    },
    submit() {
      console.log(this.question)
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
