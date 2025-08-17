import { distances, horseColors, horseNames } from "@/constants"
import { useStore } from "vuex"

export const randomIntInRange = (min = 0, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min

export const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

export const generateHorsesRandomly = () => {
    
    const shuffledNames = shuffle(horseNames)
    const shuffledColors = shuffle(horseColors)

    const horses = shuffledNames.map((name, i) => (
        {
            id: i+1,
            name,
            color: shuffledColors[i],
            condition: randomIntInRange(50, 100)
        }
    ))

    return horses
}


export const pickHorsesRandomly = (horses) => {
    let selectedHorses = []
    const baseSpeed = 50
    while (selectedHorses.length < 10) {
      const randomNumber = Math.floor(Math.random() * horses.length)
      const horse = horses[randomNumber]
      if (!selectedHorses.find(item => item.id === horse.id)) {
        selectedHorses.push({
          ...horse,
          speed: baseSpeed,
          position: 0,
          finished: false,
          phase: Math.random() * Math.PI * 2
        })
      }
    }

    return selectedHorses
  }

  export function getInitialResults() {
    return distances.map(distance => ({
      distance,
      horses: []
    }))
  }
  
