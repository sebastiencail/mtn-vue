<template>
<v-alert class = "mb-4" color="error" title= "Erreur  à l'enregistrement"  :closable = "true" v-show="props.txtErreurSubmit.length>0">
     <ul >
        <li v-for="(err, index) in props.txtErreurSubmit" :key="index">
          - {{ err }}
        </li>
      </ul>

</v-alert>

</template>

<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
  txtErreurSubmit: {
    type: Array as PropType<string[]>, // ✅ indique que c'est un tableau de string
    default: () => [] // optionnel : valeur par défaut
  }
})

</script>