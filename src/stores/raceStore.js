import { createStore } from 'vuex'
import { distances } from '@/constants'

function getInitialSchedule() {
  return distances.map(distance => ({
    distance,
    horses: Array.from({ length: 10 }, () => ({
      id: "",
      color: "",
      name: "",
      position: 0,
      speed: 0,
      finished: false
    }))
  }))
}

function getInitialResults() {
  return distances.map(distance => ({
    distance,
    horses: []
  }))
}

export default createStore({
  state: {
    allHorses: [],
    isRaceActive: false,
    raceScheduleData: getInitialSchedule(),
    activeRound: 0,
    raceResults: getInitialResults()
  },
  mutations: {
    setAllHorses(state, horses) {
      state.allHorses = horses
    },
    setRaceScheduleData(state, schedule) {
      state.raceScheduleData = schedule
    },
    setRaceResults(state, results) {
      state.raceResults = results
    },
    setActiveRound(state, round) {
      state.activeRound = round
    },
    setIsRaceActive(state, isRaceActive){
      state.isRaceActive = isRaceActive
    }
  }
})
