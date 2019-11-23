<template>
  <section class="container-content justify-content">
    <v-card max-width="400px" min-width="200px">
      <v-card-title class="grey darken-1">Upload de Vídeo</v-card-title>
      <form
        name="uploadForm"
        @submit="sendForm"
        action="file/upload"
        method="post"
        enctype="multipart/form-data"
      >
        <v-col cols="12">
          <v-flex class="container-dropzone">
            <section class="dropzone">
              <div v-if="!arquivoAtual" class="justify-column">
                <v-icon x-large>mdi-cloud-upload</v-icon>
                <span>Enviar Arquivo</span>
              </div>
              <div v-if="arquivoAtual" class="justify-column">
                <v-icon dark large>mdi-play-circle-outline</v-icon>
                <span class="body-2">{{ arquivoAtual.name }}</span>
                <span class="caption font-weight-light">{{ arquivoAtual.size }}</span>
              </div>
            </section>
            <input type="file" name="video" @change="arquivoSelecionado" />
          </v-flex>

          <v-text-field v-model="title" name="title" label="Título"></v-text-field>

          <v-textarea v-model="description" name="description" label="Uma descrição legal."></v-textarea>

          <v-checkbox v-model="agree" name="agree">
            <template v-slot:label>
              <div>
                Afirmo que li e concordo com os
                <router-link to="/license" target="new">termos de uso</router-link>.
              </div>
            </template>
          </v-checkbox>
          <v-divider dark></v-divider>

          <v-card-actions>
            <v-btn block color="primary" type="submit">Enviar</v-btn>
          </v-card-actions>
        </v-col>
      </form>
    </v-card>
  </section>
</template>

<script>
import api from '@/services/api';

export default {
  name: "Upload",
  data() {
    return {
      title: "",
      description: "",
      arquivoAtual: null,
      agree: false
    };
  },
  methods: {
    async sendForm(event) {
      event.preventDefault();

      const form = event.target;
      const data = new FormData(form);

      const config = {
        maxContentLength: 500 * 1024 * 1024,
      };

      await api.post('/video/storage', data, config)
      .catch(err => console.error(err));

      alert('ok')
    },
    arquivoSelecionado(event) {
      const file = event.target.files[0];
      const getSize = bytes => {
        if (bytes >= 1024 * 1024) {
          return `${(bytes / (1024 * 1024)).toFixed(2).replace(".", ",")} MB`;
        } else if (bytes >= 1024) {
          return `${(bytes / 1024).toFixed(2).replace(".", ",")} KB`;
        } else {
          return `${bytes} B`;
        }
      };
      const name = file.name;
      const size = getSize(file.size);
      this.arquivoAtual = { name, size };
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container-dropzone {
  position: relative;

  height: 100px;
  margin: 6px 0;

  border-radius: 10px;
  background-color: var(--v-grey-base);
  border: 2px dashed var(--v-grey-lighten3);
  transition: all 0.25s;
}

.container-dropzone:hover {
  background-color: var(--v-grey-lighten2);
}

.container-dropzone:active {
  background-color: var(--v-grey-lighten4);
}

.container-dropzone > input {
  cursor: pointer;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dropzone {
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>