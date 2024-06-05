<template>
  <div>
    <h1>Météo</h1>
    <div v-for="(cityForecasts, insee) in forecasts" :key="insee">
      <h2>Météo à {{ cityForecasts[0]?.city.name }}</h2>
      <div v-if="cityForecasts.length">
        <h3>Prévisions Météo</h3>
        <div v-for="dayForecast in cityForecasts" :key="dayForecast.update">
          <h4>
            Prévisions pour le
            {{ new Date(dayForecast.update).toLocaleDateString() }}
          </h4>
          <div
            v-for="period in dayForecast.forecast"
            :key="period.datetime"
            class="forecast-period"
          >
            <p><strong>Période:</strong> {{ getPeriodName(period.period) }}</p>
            <p>
              <strong>Date:</strong>
              {{ new Date(period.datetime).toLocaleDateString() }}
            </p>
            <p><strong>Température:</strong> {{ period.temp2m }}°C</p>
            <p><strong>Vent (10m):</strong> {{ period.wind10m }} km/h</p>
            <p><strong>Rafales (10m):</strong> {{ period.gust10m }} km/h</p>
            <p><strong>Probabilité de Pluie:</strong> {{ period.rr10 }}%</p>
            <p><strong>Probabilité de Gel:</strong> {{ period.probafrost }}%</p>
            <p>
              <strong>Probabilité de Brouillard:</strong> {{ period.probafog }}%
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const forecasts = ref({});

    const fetchWeatherForecast = async () => {
      try {
        const response = await axios.get("/data/weatherPeriods.json");
        forecasts.value = response.data.Weather;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    const getPeriodName = (period) => {
      switch (period) {
        case 0:
          return "Nuit";
        case 1:
          return "Matin";
        case 2:
          return "Après-midi";
        case 3:
          return "Soir";
        default:
          return "Inconnu";
      }
    };

    onMounted(() => {
      fetchWeatherForecast();
    });

    return { forecasts, getPeriodName };
  },
};
</script>

<style>
.forecast-period {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: #9999;
}
</style>
