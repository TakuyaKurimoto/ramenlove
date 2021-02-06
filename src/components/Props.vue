<template>
  <div class="container">
    <v-btn color="primary" @click="accumulations(); getRandom(50,100)">検索</v-btn>
    <p>テスト: {{ num }}</p>
    <ul>
      <!-- <div v-for="item in stations" :key="item.id">
        {{ item.syuppatsu }},{{ item.time }}発,{{ item.mawari }}<br />
        1号車：{{ item.gosya1 }},2号車：{{ item.gosya2 }},3号車{{ item.gosya3
        }}<br />
      </div> -->
    </ul>
    
    {{trains}}

    <!--<div class="station">-->
      <!--<div class="vehicles first">-->
        <div class="syuppatsu">
          <div v-for="item in stations" :key="item.id">
            {{ item.time }}発<br />
          </div>
        </div>

        <div class="eki">
        <!-- <div v-for="item in trains" :key="item.id">
        
            <div id="vehicle1" class="vehicle empty-condition">
              {{ sensor1[0] && sensor1[1] ? '◯' : 'X' }}
            </div>
            
            <div id="vehicle2" class="vehicle empty-condition">
              {{ sensor2[0] && sensor2[1] ? '◯' : 'X' }}
            </div>
            ...
        <div> -->

          <div v-for="item in stations" :key="item.id">
            <div class="vehicle empty-condition">
              {{ item.gosya1 }}
            </div>
            <div class="vehicle empty-condition">
              {{ item.gosya2 }}
            </div>
            <div class="vehicle empty-condition">
              {{ item.gosya3 }}
            </div>
          </div>
        </div>
      
        <!--
        <div class="vehicles second">
          <div class="syuppatsu">
            <div v-for="item in stations" :key="item.id">
              {{ item.time }}発<br />
            </div>
          </div>
          <div class="vehicle empty-condition">△</div>
          <div class="vehicle empty-condition">△</div>
          <div class="vehicle empty-condition">×</div>
          <div class="vehicle empty-condition">×</div>
          <div class="vehicle empty-condition">○</div>
          <div class="vehicle empty-condition">○</div> 
        </div>
        -->
       <!--</div>-->
  </div>
</template>
<script>
import firebase from 'firebase'

export default {
  props: ["radioButton", "state", "time"],
  data: function() {
    return {
      // dates: [
      //   {
      //     id: 1,
      //     ikebukuro: 1050,
      //     otsuka: 1030,
      //     sugamo: 1000,
      //     gosya1: "○",
      //     gosya2: "△",
      //     gosya3: "○",
      //     mawari: "外回り",
      //     syuppatsu: 0,
      //     time: 0,
      //   },
      //   {
      //     id: 2,
      //     ikebukuro: 920,
      //     otsuka: 1045,
      //     sugamo: 1050,
      //     gosya1: "○",
      //     gosya2: "○",
      //     gosya3: "×",
      //     mawari: "内回り",
      //     syuppatsu: 0,
      //     time: 0,
      //   },
      //   {
      //     id: 3,
      //     ikebukuro: 1240,
      //     otsuka: 1025,
      //     sugamo: 800,
      //     gosya1: "○",
      //     gosya2: "×",
      //     gosya3: "○",
      //     mawari: "内回り",
      //     syuppatsu: 0,
      //     time: 0,
      //   },
      //   {
      //     id: 4,
      //     ikebukuro: 1010,
      //     otsuka: 845,
      //     sugamo: 1020,
      //     gosya1: "△",
      //     gosya2: "×",
      //     gosya3: "△",
      //     mawari: "内回り",
      //     syuppatsu: 0,
      //     time: 0,
      //   },
      //   {
      //     id: 5,
      //     ikebukuro: 1030,
      //     otsuka: 1345,
      //     sugamo: 1110,
      //     gosya1: "△",
      //     gosya2: "○",
      //     gosya3: "○",
      //     mawari: "内回り",
      //     syuppatsu: 0,
      //     time: 0,
      //   },
      // ],
      stations: "",
      number: "",
      num: "",
      trains: [],
    };
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
      this.trains = searchedTrains;

      // this.stations = this.dates;
      // this.stations = this.stations.filter((station) => {
      //   //stations（全列車のデータ）から周回方向が一致している物だけを取り出す
      //   return station.mawari == this.radioButton;
      // });
      // if (this.state == "池袋") {
      //   //出発駅が池袋の場合
      //   this.stations = this.stations.filter((station) => {
      //     //池袋出発時刻が現在〜現在時刻＋100のデータを抽出
      //     return (
      //       100 + Number(this.time) >= station.ikebukuro &&
      //       station.ikebukuro >= this.time
      //     );
      //   });
      //   this.stations.forEach((station) => {
      //     //
      //     station.syuppatsu = "池袋";
      //     station.time = station.ikebukuro;
      //   });
      // } else if (this.state == "大塚") {
      //   (this.stations = this.stations.filter((station) => {
      //     return (
      //       station.otsuka >= this.time &&
      //       100 + Number(this.time) >= station.otsuka
      //     );
      //   })),
      //     this.stations.forEach((station) => {
      //       station.syuppatsu = "大塚";
      //       station.time = station.otsuka;
      //     });
      // } else if (this.state == "巣鴨") {
      //   (this.stations = this.stations.filter((station) => {
      //     return (
      //       station.sugamo >= this.time &&
      //       100 + Number(this.time) >= station.sugamo
      //     );
      //   })),
      //     this.stations.forEach((station) => {
      //       station.syuppatsu = "巣鴨";
      //       station.time = station.sugamo;
      //     });
      // }
      // this.stations.sort(function(a, b) {
      //   //データを出発時刻で降順で並び替え
      //   return a.time - b.time;
      // });
      // this.stations = this.stations.slice(0, 3); //取り出す件数指定（この場合は3件）
    },
    getRandom: function(m,n) {
      return this.num = Math.floor( Math.random() * ( m + 1 - n ) ) + n;
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
