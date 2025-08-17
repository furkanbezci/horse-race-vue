<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import HorseNameTable from './components/HorseList.vue'
import TableComponent from './components/TableComponent.vue'
import RaceArea from './components/RaceArea.vue'
import { useRaceGenerator } from '@/composables/useRaceGenerator'
import { useRaceAnimation } from '@/composables/useRaceAnimation'
import { generateHorsesRandomly } from './utils/raceUtils'

const store = useStore()
const { scheduleRace } = useRaceGenerator()
const { toggleRace } = useRaceAnimation()

onMounted(() => {
  const generatedHorses = generateHorsesRandomly()
  store.commit('setAllHorses', generatedHorses)
})

</script>

<template>
  <header class="header">
    <h1>Horse Racing</h1>
    <div class="button-group">
      <button @click="scheduleRace">Generate Program</button>
      <button @click="toggleRace" :disabled="store.state.raceScheduleData[5].isRoundFinished">Start / Pause</button>
    </div>
  </header>

  <div class="body-container">
    <HorseNameTable />
    <RaceArea />

    <div class="program-and-result-container">
      <TableComponent title="Program" :data="store.state.raceScheduleData" />
      <TableComponent title="Results" :data="store.state.raceResults" />
    </div>
  </div>
</template>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ccc;
}

.button-group button {
  width: 200px;
  margin-left: 0.5rem;
  padding: 6px 12px;
  border: 1px solid #c0c0c0;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
}

.button-group button:hover {
  background-color: #ebebeb;
}

.body-container {
  display: flex;
  align-items: stretch;
  padding-top: 20px;
}


.program-and-result-container {
  display: flex;
  gap: 1px;
  max-width: 30%;
  overflow-y: auto;
}
</style>