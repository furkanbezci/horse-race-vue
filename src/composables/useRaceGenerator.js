import { useStore } from 'vuex'
import { getInitialResults, pickHorsesRandomly, randomIntInRange } from '@/utils/raceUtils'

export function useRaceGenerator() {

  const store = useStore()

  const scheduleRace = () => {
    const allHorses = store.state.allHorses
    store.commit('setActiveRound', 0)
    const schedule = store.state.raceScheduleData.map(round => ({
      distance: round.distance,
      horses: pickHorsesRandomly(allHorses)
    }))
    store.commit('setRaceScheduleData', schedule)
    const initialResultTable = getInitialResults()
    store.commit('setRaceResults',  initialResultTable)

    store.commit('setIsRaceActive', false)
  }

  return { scheduleRace }
}
