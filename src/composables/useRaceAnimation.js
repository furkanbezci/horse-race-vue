import { useStore } from 'vuex'
import { deltaTime, raceAreaLengthInPixel } from '@/constants'

export function useRaceAnimation() {
  const store = useStore()
  let animationId

  const minSpeed = 50
  const maxSpeed = 100

  const randomDeltaSpeedCalculator = () => {

    if (Math.random() < 0.8) {
      return 0
    }
    const delta = Math.random() < 0.5 ? -4 : 4
    return delta

  }

  const animate = () => {
    animationId = requestAnimationFrame(animate)

    if (!store.state.isRaceActive) return

    const round = store.state.activeRound
    const pxPerMeter = raceAreaLengthInPixel / store.state.raceScheduleData[round].distance
    const horses = store.state.raceScheduleData[round].horses

    for (let index = 0; index < horses.length; index++) {

      const condition = horses[index].condition
      horses[index].speed = horses[index].speed !== 0 ? Math.max(minSpeed, Math.min(maxSpeed, horses[index].speed + randomDeltaSpeedCalculator())) : 0
      const currentSpeed = horses[index].speed * condition / 100 * pxPerMeter

      horses[index].position += currentSpeed * deltaTime

      if (horses[index].position >= raceAreaLengthInPixel && !horses[index].finished) {
        console.log(horses[index].position >= raceAreaLengthInPixel)
        horses[index].speed = 0
        horses[index].finished = true
        horses[index].position = raceAreaLengthInPixel
        store.state.raceResults[round].horses.push(horses[index])
        const allFinished = horses.every(v => v.finished)
        if (allFinished) {
          cancelAnimationFrame(animationId)
          store.state.raceScheduleData[round].isRoundFinished = true
        }
      }
    }
  }

  const toggleRace = () => {
    store.commit("setIsRaceActive", !store.state.isRaceActive)
    const isLapFinished = store.state.raceScheduleData[store.state.activeRound].isRoundFinished
    if (isLapFinished) {
      store.state.activeRound++
      store.commit("setIsRaceActive", !store.state.isRaceActive)
    }
    if (store.state.isRaceActive) {
      animate()
    } else {
      cancelAnimationFrame(animationId)
    }
  }

  return { toggleRace, animate }
}
