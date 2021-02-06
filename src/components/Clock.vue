<template>
  <div>
    <div class="container">
      <div class="time">
        <p class="date">{{ year }}/{{ month }}/{{ day }}</p>
        <p class="time-item">{{ hours }}:{{ minutes }}</p>
      </div>
    </div>
  </div>
</template>

<script>
const zeroPadding = (num, digit) => {
  return (Array(digit).join("0") + num).slice(-digit);
};

export default {
  data() {
    return {
      date: new Date(),
    };
  },
  computed: {
    year() {
      return this.date.getFullYear();
    },
    month() {
      return zeroPadding(this.date.getMonth() + 1, 2);
    },
    day() {
      return zeroPadding(this.date.getDate(), 2);
    },
    hours() {
      return zeroPadding(this.date.getHours(), 2);
    },
    minutes() {
      return zeroPadding(this.date.getMinutes(), 2);
    },
  },
  mounted() {
    this.setDate();
    setInterval(() => this.setDate(), 1000);
  },
  methods: {
    setDate() {
      this.date = new Date();
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");

.container {
  padding: 2%;
}

p {
  font-family: "Varela Round", monospace;
}

.date {
  display: flex;
  justify-content: center;
  flex: 1 1;
  padding: 0.5em;
  margin: 3px;
  color: #333333;
  font-family: "Varela Round", monospace;
  font-size: 1.6rem;
  letter-spacing: 0.06em;
}

.time-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1;
  height: 90px;
  position: relative;
  z-index: 1;
  padding: 0.5em;
  margin: 3px;
  color: #333333;
  font-family: "Varela Round", monospace;
  font-size: 4.2rem;
  letter-spacing: 0.06em;
  line-height: 1;
  box-sizing: border-box;
  border-radius: 9px;
}

.time-item:before {
  position: absolute;
  right: 5px;
  bottom: 1px;
  z-index: 1;
  color: #3a4a5e;
  font-family: "Teko", sans-serif;
  font-size: 1.4rem;
  letter-spacing: 0.05em;
}

.hours:before {
  content: "Hours";
}
.minutes:before {
  content: "Minutes";
}
.seconds:before {
  content: "Seconds";
}
</style>
