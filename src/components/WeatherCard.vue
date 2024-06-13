<!-- src/components/WeatherCard.vue -->
<template>
  <div
    class="weather-card border-4 border-gray-600 bg-blue-100 rounded shadow flex flex-wraper justify-center"
  >
    <div
      v-for="period in dayForecast.forecast"
      :key="period.datetime"
      class="m-4 p-2"
    >
      <p class="font-bold text-xl">{{ getPeriodName(period.period) }}</p>
      <p><strong>Température:</strong> {{ period.temp2m }}°C</p>
      <p><strong>Vent (10m):</strong> {{ period.wind10m }} km/h</p>
      <p><strong>Rafales (10m):</strong> {{ period.gust10m }} km/h</p>
      <p><strong>Probabilité de Pluie:</strong> {{ period.rr10 }}%</p>
      <p><strong>Probabilité de Gel:</strong> {{ period.probafrost }}%</p>
      <p><strong>Probabilité de Brouillard:</strong> {{ period.probafog }}%</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dayForecast: {
      type: Object,
      required: true,
    },
    getPeriodName: {
      type: Function,
      required: true,
    },
  },
  mounted() {
    console.log("dayForecast:", this.dayForecast);
    console.log("getPeriodName:", this.getPeriodName);
  },
};
</script>
