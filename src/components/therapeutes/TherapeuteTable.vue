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
    //const objError = JSON.parse(error.message)
    //txtErreurSubmit.value = objError.message
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
