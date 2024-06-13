<template>
  <div class="h-screen">
    <h1 class="font-bold underline text-red-500 text-center">Météo</h1>
    <div v-for="(cityForecasts, insee) in forecasts" :key="insee">
      <h2 class="text-center uppercase text-xl font-bold">
        à {{ cityForecasts[0]?.city.name }}
      </h2>
      <div class="" v-if="cityForecasts.length">
        <div v-for="dayForecast in cityForecasts" :key="dayForecast.update">
          <h4 class="font-semibold text-center">
            Prévision pour le
            {{
              new Date(dayForecast.forecast[0]?.datetime).toLocaleDateString()
            }}
          </h4>
          <WeatherCard
            class="items-center flex"
            :dayForecast="dayForecast"
            :getPeriodName="getPeriodName"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import WeatherCard from "./components/WeatherCard.vue";

export default {
  components: {
    WeatherCard,
  },
  setup() {
    const forecasts = ref({});

    const fetchWeatherForecast = async () => {
      try {
        const response = await axios.get("meteo/data/weatherPeriods.json");
        console.log("Response:", response.data);
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
