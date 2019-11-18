<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app clipped >
      <v-list>

        <router-link class="clean-link" to="/">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link class="clean-link" to="/upload">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-upload</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Upload</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <v-divider></v-divider>

        <router-link class="clean-link" to="/about">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-information</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sobre</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left dense color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Vimos</v-toolbar-title>

      <v-spacer />
      <v-row
        align="center"
        style="max-width: 560px"
      >
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Procurar"
          single-line
          append-icon="mdi-magnify"
          color="white"
          hide-details
        />
      </v-row>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <router-view/>
      </v-container>
    </v-content>

    <v-footer app>
      <v-spacer></v-spacer>
      <span>Vimos 2019 &copy;</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
    }),
  }
</script>

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

.clean-link {
  text-decoration: none;
}

#app {
  display: flex;
  flex-direction: column;
  font-family: "Roboto", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fafafa;
  background-color: #141414;

  min-height: 100vh;
}

.container-content {
  display: flex;
  flex-direction: column;
  align-items: center;

  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
}
</style>
