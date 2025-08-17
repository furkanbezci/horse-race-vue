<script setup>
import { roundLabels } from '@/constants';

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
    title: String
})
</script>

<template>
    <div >
        <h2>
            {{ title }}
        </h2>
        <div v-if="data" class="table-wrapper">
            <table v-for="(round, index) in data" :key="index">
                <thead>
                    <tr>
                        <th colspan="2" class="lap-label">
                            {{ roundLabels[index] }} {{ round.distance || '' }}m
                        </th>
                    </tr>
                    <tr class="table-header">
                        <th class="position-header">Position</th>
                        <th class="name-header">Name</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="round.horses && round.horses.length">
                        <tr v-for="(horse, i) in round.horses" :key="i">
                            <td>{{ i + 1 }}</td>
                            <td class="name-cell" >{{ horse?.name || "-"}}</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr v-for="n in 10" :key="'empty-' + n">
                            <td>{{ n }}</td>
                            <td>-</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.table-wrapper {
    height: 700px;
    width: 190px;
}
h2 {
    font-weight: 600;
    font-size: 20px;
    background-color: blanchedalmond;
    border: 1px solid black;
    text-align: center;
    width: 100%;
}
table {
    border: 1px solid black;
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 1px;
}
.table-header th {
    font-weight: bold;
    background-color: rgb(202, 200, 200);
    max-width: 70px ;
    width: 60px ;
  
}
.lap-label{
background-color: #fae5e8;
  color: #b71c1c;
  font-weight: bold;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #f44336;
  text-align: center;
}
th,
td {
    border: 1px solid black;
    padding: 4px;
    text-align: center;
    white-space: nowrap;
    height: 28px; 
}
.name-cell{
    font-size: 14px;
    white-space: break-spaces;
}
.position-header{
    width: 60px;
}
.name-header{
    width: 60px !important;

}


</style>
