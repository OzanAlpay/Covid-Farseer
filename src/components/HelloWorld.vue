<template>
  <div class="hello">
    <i-container>
      <i-row>
        <i-column class="_background-primary" :xs="true"> Column 1 </i-column
        ><i-column class="_background-secondary" :xs="true"> Column 2</i-column>
      </i-row></i-container
    >
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
