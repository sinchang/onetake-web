<template>
  <v-app>
    <v-container grid-list-lg fluid>
       <h1 class="text-md-center">Onetake</h1>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'app'
}
</script>

<!-- CSS libraries -->
<style src="normalize.css/normalize.css"></style>

<!-- Global CSS -->
<style>

code {
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: 0.9em;
  white-space: pre-wrap;
  color: #2c3e50;
}

code::before,
code::after {
  content: "`";
}
</style>
