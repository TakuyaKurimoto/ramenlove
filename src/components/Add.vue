// src/components/todo/Add.vue
<template>
  <div>
    <!-- <h1>Index</h1>-->
    <table>
      <thead>
        <td>name</td>
        {{
          todos
        }}
      </thead>
    </table>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
export default {
  name: "todoIndex",
  data: function() {
    return {
      db: null,
      todos: [],
    };
  },
  created: function() {
    this.db = firebase.firestore();
    var _this = this; // todos コレクションを監視する
    this.db.collection("trains").onSnapshot(function(querySnapshot) {
      _this.todos = [];
      querySnapshot.forEach(function(doc) {
        var data = doc.data();
        data.id = doc.id;
        _this.todos.push(data);
      });
    });
  },
};
</script>
