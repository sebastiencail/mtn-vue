<template>
  <v-card title="Tarifs">
    <v-container>
      <v-btn text="+ Ajouter un tarif" @click="addTarif()" class="mb-4"></v-btn>
      <v-row v-for="tarif in tarifs" align="center">
        <v-col cols="2">
          {{ tarif.ordre }}
          <v-btn @click="doUpdateOrdre(tarif, -1)" :disabled="tarif.ordre <= 1"
            ><v-icon icon="mdi-chevron-up"></v-icon
          ></v-btn>
          <v-btn
            @click="doUpdateOrdre(tarif, 1)"
            class="ml-2"
            :disabled="tarif.ordre >= tarifs.length"
            ><v-icon icon="mdi-chevron-down"></v-icon
          ></v-btn>
        </v-col>
        <v-col
          ><v-text-field
            v-model="tarif.description"
            label="Description"
            density="compact"
            hide-details
          ></v-text-field
        ></v-col>
        <v-col
          ><v-text-field
            v-model="tarif.prix"
            label="Prix"
            density="compact"
            hide-details
          ></v-text-field
        ></v-col>
        <v-col>
          <v-btn class="bg-secondary" @click="doUpdateTarif(tarif)">Enregistrer</v-btn>
          <v-btn class="bg-red ml-2" @click="removeTarif(tarif.id)">Supprimer</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { components } from '../../api/generated'
import {
  createTarif,
  deleteTarif,
  getTarifsByTherapeute,
  toUpdateTarifDto,
  updateTarif,
  UpdateTarifDto,
} from '@/api/tarifs.api'

type ReadTarifDto = components['schemas']['ReadTarifDto']

const tarifs = ref<ReadTarifDto[]>([])

const props = defineProps<{
  idTherapeute: number
}>()

onMounted(async () => {
  fetchTarifsByTherapeute()
})

const fetchTarifsByTherapeute = async () => {
  try {
    tarifs.value = await getTarifsByTherapeute(props.idTherapeute)
  } catch (e) {
    console.error(e)
  }
}

const addTarif = async () => {
  await createTarif({
    description: 'remplir la description',
    ordre: tarifs.value.length + 1,
    therapeuteId: props.idTherapeute,
  })
  fetchTarifsByTherapeute()
}

const doUpdateTarif = (tarif: ReadTarifDto) => {
  let tarifToUpdate = toUpdateTarifDto(tarif)
  updateTarif(tarif.id, tarifToUpdate)
}

const removeTarif = async (id: number) => {
  await deleteTarif(id)
  fetchTarifsByTherapeute()
}

const doUpdateOrdre = async (tarif: ReadTarifDto, increment: number) => {
  let newOrdre = tarif.ordre + increment
  let oldOrdre = tarif.ordre

  let tarifToUpdate = toUpdateTarifDto(tarif)
  tarifToUpdate.ordre = newOrdre
  await updateTarif(tarif.id, tarifToUpdate)

  /** Inversion de la ligne avec le numéro ordre cible */
  // let tarifSwitch = tarifs.value.filter((elem) => elem.ordre == newOrdre)[0]
  // let tarifSwitchToUpdate = toUpdateTarifDto(tarifSwitch)
  // await updateTarif(tarifSwitch.id, tarifSwitchToUpdate)

  fetchTarifsByTherapeute()
}
</script>
