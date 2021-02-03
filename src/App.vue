<template>
  <div class="about flex flex-col items-center">
    <input type="text" class="bg-gray-300 px-4 py-2" autocomplete="off" v-model="state" @input="filterStates" @focus="modal = true"><br>
    <div id="app">
	<input type="checkbox" v-model="checkValue" value="外回り"> 外回り
	<input type="checkbox" v-model="checkValue" value="内回り"> 内回り
	<p>{{ checkValue }}</p>
</div>
    <div v-if="filteredStates && modal">
      <ul class="w-48 bg-gray-800 text-white">
        <li v-for="filteredState in filteredStates" class="py-2 border-b cursor-pointer" :key="filteredState" @click="setState(filteredState)">{{ filteredState[1] }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
var app = new Vue({
    el: '#app',
    data: {
  	  checkValue: [],		
    }
  })
export default {
  

  data: function () {
    return {
      state: '',
      modal: false,
      states: [
        ['いけぶくろ','池袋'], ['おおつか','大塚'], ['すがも', '巣鴨'],['こまごめ','駒込'], ['たばた','田端'], ['にしにっぽり', '西日暮里'],
        ['にっぽり','日暮里'], ['うぐいすだに','鶯谷'], ['うえの', '上野'],['おかちまち','御徒町'], ['あきはばら','秋葉原'], ['かんだ', '神田'],
        ['とうきょう','東京'], ['ゆうらくちょう','有楽町'], ['しんばし', '新橋'],['はままつちょう','浜松町'], ['たまち','田町'], ['たかなわゲートウェイ', '高輪ゲートウェイ'],
        ['しながわ','品川'], ['おおさき','大崎'], ['ごたんだ', '五反田'],['めぐろ','目黒'], ['えびす','恵比寿'], ['しぶや', '渋谷'],
        ['はらじゅく','原宿'], ['しんおおくぼ','新大久保'], ['たかだのばば', '高田馬場'],['めじろ','目白']
      ],
      filteredStates: [],
    }
  },
  mounted() {
    this.filterStates();
  },
  methods: {
    filterStates() {
      if (this.state.length == 0) {
        this.filteredStates = this.states;
      }
      this.filteredStates = this.states.filter(state => {
        return state[0].startsWith(this.state);
      });
    },
    setState(state) {
      this.state = state[1];
      this.modal = false;
    }
  },
  watch: {
    state() {
      this.filterStates();
    }
  }
}
</script>
