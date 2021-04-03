<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <label>{{minute | decimalNomination}}:{{second | decimalNomination}} min/seg</label>
    <div class="counters">
      <button v-for="(counter,index) in counters" :key="index" @click="onCounter(counter)">{{counter.name}}</button>
    </div>
  </div>
</template>

<script>
import Counter from '../classes/Counter.js'
export default {
  name: 'CuentaRegresiva',
  props: {
    msg: String
  },
  data() {
    return {
      counters: [
        new Counter(3,'s'),
        new Counter(1,'m'),
        new Counter(5,'m'),
        new Counter(10,'m'),
        new Counter(30,'m'),
        ],
      second: 0,
      minute: 0,
      interval : ''
    }
  },
  methods: {
    onCounter(counter) {
      this.resetCounter();
      this.setupCounter(counter);
      this.startCounter(counter);
    },
    resetCounter(){
      clearInterval(this.interval);
      this.second = 0;
      this.minute = 0;
    },
    setupCounter(counter){
      switch(counter.unit){
        case 's': this.second = counter.cant;break;
        case 'm': this.minute = counter.cant;break;
      }
    },
    startCounter(){
      this.interval = setInterval(()=>{
        if(this.second == 0){
          this.minute--;
          this.second = 60;
        }

        if(this.minute < 0){
          this.minute = 0;
        }

        if(this.second < 0 ){
          this.second = 0;
        }

        this.second--;
      },1000);
    },
  },
  filters:{
    decimalNomination: (value)=>{
      return value<10 ? `0${value}` : value;
    }
  },
  watch: {
    second(newValue, oldValue) {
      if(newValue == 0 && this.minute == 0)
          clearInterval(this.interval);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" scoped>
.hello{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.counters{
  display:flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin-top: 20px;
}
h3 {
  margin: 40px 0 0;
}

</style>
