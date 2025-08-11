<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const horses = computed(() => store.state.allHorses)

</script>

<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th colspan="3" class="main-header">
                        Horse List (1-20)
                    </th>
                </tr>
                <tr class="table-header">
                    <th>Name</th>
                    <th>Condition</th>
                    <th>Color</th>
                </tr>
            </thead>
            <tbody>

                <tr v-for="horse in horses">
                    <td>
                        {{ horse.name }}
                    </td>
                    <td>
                        {{ horse?.condition }}
                    </td>
                    <td :style="{ background: horse.color }">
                        {{ horse?.color }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
table {
    border: 1px solid black;
    border-collapse: collapse;
    width: 30%;


}

.table-header th {
    font-weight: bold;
    background-color: rgb(202, 200, 200);
}

th,
td {
    border: 1px solid black;
    padding: 4px 5px;
    text-align: center;
    white-space: nowrap;

}

.main-header {
    font-weight: 600;
    font-size: 20px;
    background-color: blanchedalmond;
}
</style>