<template>
  <v-card title="Liste des thérapeutes">
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>
    <v-data-table :items="therapeutes" hover :headers="headers" :search="search">
      <template v-slot:top>
        <v-toolbar>
          <v-btn
            class="me-2 bg-primary"
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
          <v-icon icon="mdi-delete" class="cursor-pointer" @click="confirmDeleteTherapeute(item)" />
        </div>
      </template>
    </v-data-table>
  </v-card>
  <v-dialog v-model="confirmDeleteDialog" width="auto">
    <v-card
      max-width="800"
      prepend-icon="mdi-delete"
      :text="confirmDeleteMessage"
      title="Confirmation suppression"
    >
      <template v-slot:actions>
        <v-btn text="Annuler" @click="confirmDeleteDialog = false"></v-btn>
        <v-btn text="Supprimer" @click="doDeleteTherapeute" class="bg-red"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { deleteTherapeute, getTherapeutes } from '@/api/therapeutes.api'
import type { components } from '../../api/generated'

type ReadTherapeute = components['schemas']['ReadTherapeuteDto']

const therapeutes = ref<ReadTherapeute[]>([])
const therapeuteToDelete = ref<ReadTherapeute>()
const search = ref('')

const router = useRouter()
const confirmDeleteDialog = ref(false)

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

const doDeleteTherapeute = async () => {
  confirmDeleteDialog.value = false
  if (!therapeuteToDelete.value) return
  try {
    await deleteTherapeute(therapeuteToDelete.value.id)
    fetchTherapeutes()
  } catch (error: any) {
    console.error(error)
  }
}

const confirmDeleteTherapeute = (item: ReadTherapeute) => {
  therapeuteToDelete.value = item
  confirmDeleteDialog.value = true
}

const newTherapeute = () => {
  router.push(`/therapeutes/new`)
}

const confirmDeleteMessage = computed(() => {
  return 'Confirmer la suppression de ' + therapeuteToDelete.value?.nom + '?'
})
</script>
