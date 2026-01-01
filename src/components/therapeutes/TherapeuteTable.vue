<template>
  <v-card>
    <v-data-table :items="therapeutes" hover :headers="headers">
      <template v-slot:top>
        <v-toolbar>
          <v-toolbar-title>
            <v-icon color="medium-emphasis" icon="mdi-book-multiple" size="x-small" start></v-icon>

            Liste des thérapeutes
          </v-toolbar-title>

          <v-btn
            class="me-2"
            rounded="lg"
            text="Ajouter un thérapeute"
            prepend-icon="mdi-plus"
            @click="add"
          ></v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon icon="mdi-pencil" class="cursor-pointer" @click="editTherapeute(item.id)" />
          <v-icon icon="mdi-delete" class="cursor-pointer" />
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { components } from '../../api/generated'
import { getTherapeutes } from '@/api/therapeutes.api'

type ReadTherapeute = components['schemas']['ReadTherapeuteDto']

const therapeutes = ref<ReadTherapeute[]>([])
const router = useRouter()

const headers = [
  { title: 'Nom', key: 'nom' },
  { title: 'Prénom', key: 'prenom' },
  { title: 'Spécialités', key: 'specialites' },
  { title: 'Téléphone', key: 'telPortable' },
  { title: 'Email', key: 'email' },
  {
    title: 'Actions',
    key: 'actions',
    align: 'end',
    sortable: false,
  },
]

onMounted(async () => {
  fetchTherapeutes()
})
function add() {
  newTherapeute()
}

const fetchTherapeutes = async () => {
  try {
    therapeutes.value = await getTherapeutes()
  } catch (e) {
    console.error(e)
  }
}

const editTherapeute = (id: number) => {
  router.push(`/therapeutes/${id}`)
}

const newTherapeute = () => {
  router.push(`/therapeutes/new`)
}
</script>
