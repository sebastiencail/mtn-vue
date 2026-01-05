<template>
  <v-card title="Fiche therapeute" class="mb-4 pb-4">
    <v-form v-if="therapeute">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="therapeute.nom" label="Nom"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="therapeute.prenom" label="Prénom"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="therapeute.siteWeb" label="Site web"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="therapeute.email" label="Email"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="therapeute.telPortable" label="Portable"></v-text-field>
          </v-col>
        </v-row>
        <v-textarea v-model="therapeute.specialites" label="Spécialités"></v-textarea>

        <error-form-alert :txt-erreur-submit="txtErreurSubmit"></error-form-alert>
        <v-btn @click="submit" class="bg-primary">Enregistrer</v-btn>
      </v-container>
    </v-form>
    <v-snackbar v-model="snackbar" :timeout="200" color="success" top right>
      Enregistrement effectué avec succès !
    </v-snackbar>
  </v-card>
  <tarifs-table v-if="therapeute" :id-therapeute="therapeute.id"></tarifs-table>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  getTherapeute,
  updateTherapeute,
  ReadTherapeuteDto,
  toUpdateTherapeuteDto,
  createTherapeute,
} from '@/api/therapeutes.api'
import ErrorFormAlert from '../commons/ErrorFormAlert.vue'
import TarifsTable from '../tarifs/TarifsTable.vue'

const route = useRoute()
const router = useRouter()

var formCreation = false

const snackbar = ref(false)
const therapeute = ref<ReadTherapeuteDto | null>(null)
const txtErreurSubmit = ref<string[]>([])

const fetchTherapeute = async () => {
  let idParam = route.params.id as string

  if (idParam != 'new') {
    try {
      therapeute.value = await getTherapeute(idParam)
    } catch (e) {
      console.error(e)
    }
  } else {
    formCreation = true
    therapeute.value = {
      nom: '',
      prenom: '',
      specialites: '',
      telPortable: '',
      id: 0,
    }
  }
}

const goBack = () => {
  router.back()
}

const formatDate = (date?: string) => {
  if (!date) return '-'
  return new Date(date).toLocaleString()
}

onMounted(fetchTherapeute)

const submit = async () => {
  if (!therapeute.value) return
  txtErreurSubmit.value = []

  if (formCreation) {
    doCreateTherapeute(therapeute.value)
  } else doUpdateTherapeute()
}

const doCreateTherapeute = async (therapeuteToCreate: ReadTherapeuteDto) => {
  const payload = toUpdateTherapeuteDto(therapeuteToCreate)
  try {
    therapeute.value = await createTherapeute(payload)
    snackbar.value = true // afficher le message
  } catch (error: any) {
    const objError = JSON.parse(error.message)
    txtErreurSubmit.value = objError.message
    console.error(error)
  }
}

const doUpdateTherapeute = async () => {
  if (!therapeute.value) return
  const payload = toUpdateTherapeuteDto(therapeute.value)

  try {
    therapeute.value = await updateTherapeute(therapeute.value.id, payload)
    snackbar.value = true // afficher le message
  } catch (error: any) {
    const objError = JSON.parse(error.message)
    txtErreurSubmit.value = objError.message
    console.error(error)
  }
}
</script>
