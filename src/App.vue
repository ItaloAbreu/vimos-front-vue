<template>
  <div id="app">
    <nav class="nav justify-content">
      <router-link to="/">Home</router-link>
    </nav>
    <section class="content">
      <router-view/>
    </section>
    <footer class="nav justify-content">
      <router-link to="/about">About</router-link>
    </footer>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.justify-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  display: flex;
  flex-direction: column;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #917fb9;
  background-color: #141414;

  min-height: 100vh;
}

.content {
  min-height: calc(100vh - 120px);
}

.nav {
  width: 100%;
  height: 60px;
  padding: 30px;
  color: #fafafa;
  background-color: #333;
}

.nav a {
  text-decoration: none;
  font-weight: bold;
  color: #917fb9;
}

.nav a.router-link-exact-active {
  color: #a794d4;
}
</style>
