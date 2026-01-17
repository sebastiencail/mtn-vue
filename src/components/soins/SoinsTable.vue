<template>
  <v-card title="Soins">
    <v-container>
      <v-btn text="+ Ajouter un soin" @click="addSoin()" class="mb-4"></v-btn>
      <v-row v-for="soin in soins" align="center">
        <v-col cols="2">
          {{ soin.ordre }}
          <v-btn @click="doUpdateOrdre(soin, -1)" :disabled="soin.ordre <= 1"
            ><v-icon icon="mdi-chevron-up"></v-icon
          ></v-btn>
          <v-btn @click="doUpdateOrdre(soin, 1)" class="ml-2" :disabled="soin.ordre >= soins.length"
            ><v-icon icon="mdi-chevron-down"></v-icon
          ></v-btn>
        </v-col>
        <v-col
          ><v-textarea
            v-model="soin.description"
            label="Description"
            density="compact"
            hide-details
          ></v-textarea
        ></v-col>

        <v-col>
          <v-btn class="bg-secondary" @click="doUpdateSoin(soin)">Enregistrer</v-btn>
          <v-btn class="bg-red ml-2" @click="removeSoin(soin.id)">Supprimer</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  createSoin,
  deleteSoin,
  getSoinsByTherapeute,
  ReadSoinDto,
  toUpdateSoinDto,
  updateSoin,
} from '@/api/soins.api'

const soins = ref<ReadSoinDto[]>([])

const props = defineProps<{
  idTherapeute: number
}>()

onMounted(async () => {
  fetchSoinsByTherapeute()
})

const fetchSoinsByTherapeute = async () => {
  try {
    soins.value = await getSoinsByTherapeute(props.idTherapeute)
  } catch (e) {
    console.error(e)
  }
}

const addSoin = async () => {
  await createSoin({
    description: 'remplir la description',
    ordre: soins.value.length + 1,
    therapeuteId: props.idTherapeute,
  })
  fetchSoinsByTherapeute()
}

const doUpdateSoin = (soin: ReadSoinDto) => {
  let soinToUpdate = toUpdateSoinDto(soin)
  updateSoin(soin.id, soinToUpdate)
}

const removeSoin = async (id: number) => {
  await deleteSoin(id)
  fetchSoinsByTherapeute()
}

const doUpdateOrdre = async (soin: ReadSoinDto, increment: number) => {
  let newOrdre = soin.ordre + increment

  let soinToUpdate = toUpdateSoinDto(soin)
  soinToUpdate.ordre = newOrdre
  await updateSoin(soin.id, soinToUpdate)

  fetchSoinsByTherapeute()
}
</script>
