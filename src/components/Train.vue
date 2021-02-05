<template>
  <div>
    <div class="container">
      <div class="station">
        <div class="vehicles first">
          <p>08:00 発</p>

          <div class="vehicle empty-condition">○</div>
          <div class="vehicle empty-condition">○</div>
          <div class="vehicle empty-condition">×</div>
          <div class="vehicle empty-condition">×</div>
          <div class="vehicle empty-condition">△</div>
          <div class="vehicle empty-condition">△</div>
        </div>
        <div class="vehicles second">
          <p>08:10 発</p>

          <div class="vehicle empty-condition">△</div>
          <div class="vehicle empty-condition">△</div>
          <div class="vehicle empty-condition">×</div>
          <div class="vehicle empty-condition">×</div>
          <div class="vehicle empty-condition">○</div>
          <div class="vehicle empty-condition">○</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Train",
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

.vehicles {
  display: flex;
  flex-direction: row;
  margin: 12px;
}
.vehicle {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1;
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
</style>
