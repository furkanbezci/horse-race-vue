<script setup>
import Horse from '@/assets/horse.svg'
import { roundLabels } from '@/constants';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const raceScheduleData = computed(() => store.state.raceScheduleData)
const activeRound = computed(() => store.state.activeRound)
</script>

<template>
    <div class="race-container">
        {{ console.log(raceScheduleData) }}
        <div v-if="raceScheduleData">
            <div v-for="(horse, index) in raceScheduleData?.[activeRound]?.horses" :key="horse?.id" class="race-line">
                <div class="order">
                    {{ index + 1 }}
                </div>
                <div :style="{
                    transform: `translate(${horse.position}px)`
                }" class="horse-container">
                    <div class="horse-name">{{ horse.name }}</div>
                    <div>
                        <Horse width="32" height="32" :fill="horse.color" />
                    </div>
                </div>
            </div>
        </div>
        <div class="finish" >FINISH</div>
        <div class="round-label">
            {{ `${roundLabels[activeRound]} lap ${raceScheduleData?.[activeRound].distance}m` }}
        </div>
    </div>
</template>

<style scoped>
.race-container {
    padding: 0px 10px;
    height: 100%;
    width: 550px;
    min-width: 550px ;
    margin-right: 15px;
    border-right: 2px solid red;
}

.order {
    height: 60px;
    width: 20px;
    background-color: #ccc;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.race-line {
    display: flex;
    align-items: center;
    border-bottom: 1px dashed black;
}

.race-line:first-child {
    border-top: 1px dashed black;
}

.horse-container {
    padding: 5px;
}

.horse {
    width: 150px;
    height: 30px;

}

.horse-name {
    font-size: 7px;
    width: 40px;
    white-space: break-spaces;
}

.round-label {
    display: flex;
    justify-content: center;
    padding: 10px;
    color: #b71c1c;
    font-size: 18px;
    font-family: 'Courier New', Courier, monospace;
    position: absolute;
    margin-left: 200px;
}
.finish{
    padding: 10px;
    color: #b71c1c;
    font-size: 18px;
    position: absolute;
    margin-left: 480px;
}
</style>