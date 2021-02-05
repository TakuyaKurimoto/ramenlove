<template>
  <div class="container">
    <v-btn color="error" @click="accumulations()">検索</v-btn>
    <ul>
      <li v-for="item in stations" :key="item.id">
        {{ item.syuppatsu }},{{ item.time }}発,{{ item.mawari }}<br />
        1号車：{{ item.gosya1 }},2号車：{{ item.gosya2 }},3号車{{ item.gosya3
        }}<br />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["radioButton", "state", "time"],
  data: function() {
    return {
      dates: [
        {
          id: 1,
          ikebukuro: 1050,
          otsuka: 1030,
          sugamo: 1000,
          gosya1: "○",
          gosya2: "△",
          gosya3: "○",
          mawari: "外回り",
          syuppatsu: 0,
          time: 0,
        },
        {
          id: 2,
          ikebukuro: 920,
          otsuka: 1045,
          sugamo: 1050,
          gosya1: "○",
          gosya2: "○",
          gosya3: "×",
          mawari: "内回り",
          syuppatsu: 0,
          time: 0,
        },
        {
          id: 3,
          ikebukuro: 1240,
          otsuka: 1025,
          sugamo: 800,
          gosya1: "○",
          gosya2: "×",
          gosya3: "○",
          mawari: "内回り",
          syuppatsu: 0,
          time: 0,
        },
        {
          id: 4,
          ikebukuro: 1010,
          otsuka: 845,
          sugamo: 1020,
          gosya1: "△",
          gosya2: "×",
          gosya3: "△",
          mawari: "内回り",
          syuppatsu: 0,
          time: 0,
        },
        {
          id: 5,
          ikebukuro: 1030,
          otsuka: 1345,
          sugamo: 1110,
          gosya1: "△",
          gosya2: "○",
          gosya3: "○",
          mawari: "内回り",
          syuppatsu: 0,
          time: 0,
        },
      ],
      stations: "",
      number: "",
    };
  },

  methods: {
    accumulations: function() {
      this.stations = this.dates;
      this.stations = this.stations.filter((station) => {
        //stations（全列車のデータ）から周回方向が一致している物だけを取り出す
        return station.mawari == this.radioButton;
      });
      if (this.state == "池袋") {
        //出発駅が池袋の場合
        this.stations = this.stations.filter((station) => {
          //池袋出発時刻が現在〜現在時刻＋100のデータを抽出
          return (
            100 + Number(this.time) >= station.ikebukuro &&
            station.ikebukuro >= this.time
          );
        });
        this.stations.forEach((station) => {
          //
          station.syuppatsu = "池袋";
          station.time = station.ikebukuro;
        });
      } else if (this.state == "大塚") {
        (this.stations = this.stations.filter((station) => {
          return (
            station.otsuka >= this.time &&
            100 + Number(this.time) >= station.otsuka
          );
        })),
          this.stations.forEach((station) => {
            station.syuppatsu = "大塚";
            station.time = station.otsuka;
          });
      } else if (this.state == "巣鴨") {
        (this.stations = this.stations.filter((station) => {
          return (
            station.sugamo >= this.time &&
            100 + Number(this.time) >= station.sugamo
          );
        })),
          this.stations.forEach((station) => {
            station.syuppatsu = "巣鴨";
            station.time = station.sugamo;
          });
      }
      this.stations.sort(function(a, b) {
        //データを出発時刻で降順で並び替え
        return a.time - b.time;
      });
      this.stations = this.stations.slice(0, 3); //取り出す件数指定（この場合は3件）
    },
  },
};
</script>

<style scoped>
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
</style>
