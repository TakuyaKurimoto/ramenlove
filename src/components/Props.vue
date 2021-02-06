<template>
  <div class="container">
    <v-btn color="primary" @click="accumulations()">検索</v-btn>
        

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
      const time = parseInt(this.time, 10);
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
      this.hanrei="○：空いてます,△：少し混んでます,×：狭いです"
      
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
  float: left;
}
.syuppatsu {
  font-family: "Varela Round", monospace;
}
.eki{
  display: flex;
  flex-direction:column;
}
</style>