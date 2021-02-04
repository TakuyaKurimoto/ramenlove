<template>
  <!--参考記事
https://blog.capilano-fw.com/?p=1482#i-3
https://www.yoshida.red/2020/04/30/vue-autocomplete/
-->
  <div class="container">
    <div class="about flex flex-col items-center">
      <img src="@/assets/yamanote.png" class="yamanote_logo" />
      <input
        type="text"
        class="bg-gray-300 px-4 py-2"
        autocomplete="off"
        v-model="state"
        @input="filterStates"
        @focus="modal = true"
      /><br />
      <div v-if="filteredStates && modal">
        <ul class="w-48 bg-gray-800 text-white">
          <li
            v-for="filteredState in filteredStates"
            class="py-2 border-b cursor-pointer"
            :key="filteredState"
            @click="setState(filteredState)"
          >
            {{ filteredState[1] }}
          </li>
        </ul>
      </div>
      <label v-for="(label, id) in radioButtonOptions" v-bind:key="id">
        <input
          type="radio"
          name="music"
          :value="id"
          v-model="radioButtonValue"
        />{{ label }}
      </label>
      <button type="button" @click="changeRadioButton()">ボタン</button>
      <br />
      <!--変数の中身： {{ radioButton }}({{ state }})-->
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      state: "",
      modal: false,
      states: [
        ["いけぶくろ", "池袋"],
        ["おおつか", "大塚"],
        ["すがも", "巣鴨"],
        ["こまごめ", "駒込"],
        ["たばた", "田端"],
        ["にしにっぽり", "西日暮里"],
        ["にっぽり", "日暮里"],
        ["うぐいすだに", "鶯谷"],
        ["うえの", "上野"],
        ["おかちまち", "御徒町"],
        ["あきはばら", "秋葉原"],
        ["かんだ", "神田"],
        ["とうきょう", "東京"],
        ["ゆうらくちょう", "有楽町"],
        ["しんばし", "新橋"],
        ["はままつちょう", "浜松町"],
        ["たまち", "田町"],
        ["たかなわゲートウェイ", "高輪ゲートウェイ"],
        ["しながわ", "品川"],
        ["おおさき", "大崎"],
        ["ごたんだ", "五反田"],
        ["めぐろ", "目黒"],
        ["えびす", "恵比寿"],
        ["しぶや", "渋谷"],
        ["はらじゅく", "原宿"],
        ["しんおおくぼ", "新大久保"],
        ["たかだのばば", "高田馬場"],
        ["めじろ", "目白"],
      ],
      filteredStates: [],
      radioButtonValue: 1, // 初期値（ロック）
      radioButtonOptions: {
        1: "外回り",
        2: "内回り",
      },
    };
  },
  mounted() {
    this.filterStates();
  },
  methods: {
    filterStates() {
      if (this.state.length == 0) {
        this.filteredStates = this.states;
      }
      this.filteredStates = this.states.filter((state) => {
        return state[0].startsWith(this.state);
      });
    },
    setState(state) {
      this.state = state[1];
      this.modal = false;
    },
    changeRadioButton() {
      this.radioButtonValue = 3; // クラシックへ変更
    },
  },
  computed: {
    radioButton() {
      return this.radioButtonOptions[this.radioButtonValue];
    },
  },
  watch: {
    state() {
      this.filterStates();
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
</style>
