<template>
  <div class="container">
    <v-btn color="primary" @click="getNow();;errorcheck();accumulations()">検索</v-btn>
        <p>{{error}}</p>
        <div class="eki">
          <div v-for="item in trains" :key="item.id">
            {{item.timeTable.station_name}}{{item.timeTable.stop_time}}発,{{item.around}}<br>
            <div id="vehicle1" class="vehicle empty-condition">
              {{crowded(item.sensor1)}}<br>
              1号車
            </div>
            <div id="vehicle2" class="vehicle empty-condition">
              {{crowded(item.sensor2)}}<br>
              2号車
            </div>
            <div id="vehicle1" class="vehicle empty-condition">
              {{crowded(item.sensor3)}}<br>
              3号車
            </div>
            <div id="vehicle2" class="vehicle empty-condition">
              {{crowded(item.sensor4)}}<br>
              4号車
            </div>
            <div id="vehicle1" class="vehicle empty-condition">
              {{crowded(item.sensor5)}}<br>
              5号車
            </div>
            <div id="vehicle2" class="vehicle empty-condition">
              {{crowded(item.sensor6)}}<br>
              6号車
            </div>
          </div>   
        </div>
        
          <p>{{ hanrei }}</p>
      
  </div>
</template>
<script>
import firebase from 'firebase'
export default {
  props: ["radioButton", "state", "time"],
  data: function() {
    return {
      stations: "",
      number: "",
      num: "",
      trains: [],
      hanrei:"",
      s:"",
      getTime:"",
      error:"",
    };
  },
  computed:{
    crowded: function(){
      return function(value){
      if(value[0]===true && value[1]===true){
        return "○"
      }
      else if(value[0]===false && value[1]===false){
        return "×"
      }
      else{
        return "△"
      }
    }

    }

  },
  methods: {
    accumulations: async function() {
      const stationName = this.state;
      const around = this.radioButton;
      const time = parseInt(this.getTime);
      // console.log(this.state);
      console.log(around);
      console.log(stationName);
      console.log(time);
      const db = firebase.firestore()
      const snapShot = await db.collection('trains').get();
      const trains = snapShot.docs.map(x => x.data());
      console.log(trains);
      // 時間が近い駅が止まる電車を探す
      const searchedTrains = trains
        .filter(x => x.around === around)
        .map(x => {
          const timeTable = x.time_tables
            .filter(y => y.station_name === stationName)
            .find(y => y.stop_time - time > 0);
          return ({
            ...x,
            timeTable,
            waitingTime: timeTable ? timeTable.time - time : undefined,
          })
        })
        .filter(x => x.waitingTime !== undefined)
        .sort((a, b) => a.waitingTime >= b.waitingTime)
      this.trains = searchedTrains.slice(0, 2); 

      
      
    },
    getNow() {
      var now = new Date();
      var hour = now.getHours();
      var min = String(now.getMinutes());
      if (min.length === 1) {
        min = "0" + min;
      }
      this.getTime= String(hour)+min;
    },
    errorcheck(){
      if(
      this.state=== "東京"||this.state==="神田"||this.state==="秋葉原"||this.state==="御徒町"||this.state==="上野"||
      this.state==="鶯谷"||this.state==="日暮里"||this.state==="西日暮里"||this.state==="田端"||this.state==="駒込"||
      this.state==="巣鴨"||this.state==="大塚"||this.state==="池袋"||this.state==="目白"||this.state==="高田馬場"||
      this.state==="新大久保"||this.state==="新宿"||this.state==="代々木"||this.state==="原宿"||this.state==="渋谷"||
      this.state==="恵比寿"||this.state==="目黒"||this.state==="五反田"||this.state==="大崎"||this.state==="品川"||
      this.state==="高輪ゲートウェイ"||this.state==="田町"||this.state==="浜津町"||this.state==="新橋"||this.state==="有楽町"
      ){
        this.error="";
        this.hanrei="○：空いてます,△：少し混んでます,×：狭いです";
      }
      else {
        this.error="駅名が正しくありません";
        this.hanrei="";
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");
.container {
  text-align: center;
}
.yamanote_logo {
  width: 48px;
  height: 48px;
}
v-btn {
  color: white;
}
.container {
  padding: 2%;
}
p {
  font-family: "Varela Round", monospace;
}
.vehicles {
  display: flex;
  flex-direction: row;
  margin: 12px;
}
.vehicle {
  display:inline-block;
  z-index: 1;
  padding: 0.5em;
  margin: 3px;
  height: 90px;
  width: 120px;
  background-color: gray;
  border-radius: 9px;
}
.empty-condition {
  text-align: center;
  font-size: 24px;
  color: #fff;
  
}
.syuppatsu {
  font-family: "Varela Round", monospace;
}
.eki{
  display: flex;
  flex-direction:column;
}
</style>