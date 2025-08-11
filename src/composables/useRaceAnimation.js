import { useStore } from 'vuex'
import { deltaTime, raceAreaLengthInPixel } from '@/constants'

export function useRaceAnimation() {
  const store = useStore()
  let animationId

  const animate = () => {
    animationId = requestAnimationFrame(animate)


    if (!store.state.isRaceActive) return

    const round = store.state.activeRound
    const pxPerMeter = raceAreaLengthInPixel / store.state.raceScheduleData[round].distance

    const horses = store.state.raceScheduleData[round].horses

    for (let index = 0; index < horses.length; index++) {
      const condition = horses[index].condition
      const currentSpeed = horses[index].speed * condition / 100 * pxPerMeter
      horses[index].position += currentSpeed * deltaTime

      if (horses[index].position >= raceAreaLengthInPixel && !horses[index].finished) {
        horses[index].speed = 0
        horses[index].finished = true
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
    store.state.isRaceActive = !store.state.isRaceActive
    const isLapFinished = store.state.raceScheduleData[store.state.activeRound].isRoundFinished
    if (isLapFinished) {
      store.state.activeRound++
      store.state.isRaceActive = !store.state.isRaceActive
    }
    if (store.state.isRaceActive) {
      animate()
    } else {
      cancelAnimationFrame(animationId)
    }
  }

  return { toggleRace, animate }
}
