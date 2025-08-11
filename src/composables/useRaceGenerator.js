import { useStore } from 'vuex'
import { horseNames } from '@/constants'

export function useRaceGenerator() {
  const store = useStore()

  const randomIntInRange = (min = 0, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min

  const generateHorsesRandomly = () => {
    const horses = horseNames.map((item, i) => ({
      ...item,
      id: i + 1,
      condition: randomIntInRange(50, 100)
    }))
    store.commit('setAllHorses', horses)
  }

  const pickHorsesRandomly = () => {
    let selectedHorses = []
    const baseSpeed = 50
    const allHorses = store.state.allHorses

    while (selectedHorses.length < 10) {
      const randomNumber = Math.floor(Math.random() * allHorses.length)
      const horse = allHorses[randomNumber]
      if (!selectedHorses.find(item => item.id === horse.id)) {
        selectedHorses.push({
          ...horse,
          speed: randomIntInRange(0, 50) + baseSpeed,
          position: 0,
          finished: false
        })
      }
    }
    return selectedHorses
  }

  const scheduleRace = () => {
    store.commit('setActiveRound', 0)
    const schedule = store.state.raceScheduleData.map(round => ({
      distance: round.distance,
      horses: pickHorsesRandomly()
    }))
    store.commit('setRaceScheduleData', schedule)
    store.commit('setRaceResults', store.state.raceResults.map(r => ({ distance: r.distance, horses: [] })))
    store.state.isRaceActive = false
  }

  return { generateHorsesRandomly, pickHorsesRandomly, scheduleRace }
}
