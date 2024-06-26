import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const token = process.env.API_TOKEN;
const apiClient = axios.create({
  baseURL: 'https://api.meteo-concept.com/api',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const fetchWeatherForecast = async (insee, day) => {
  try {
    const response = await apiClient.get(`/forecast/daily/${day}/periods?insee=${insee}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for INSEE ${insee} and day ${day}:`, error);
    return null;
  }
};

const saveData = async () => {
  const inseeCodes = ['04008'];
  // const inseeCodes = ['04008' ,'04061', '04173', '04144', '04076']; // Ajouter d'autres codes INSEE ici
  // Ajouter d'autres codes INSEE ici
  const allForecasts = { Weather: {} };
  const now = new Date().toISOString();

  for (const insee of inseeCodes) {
    const forecasts = [];

    for (let day = 0; day <= 7; day++) { // Ajuster le nombre de jours en fonction de vos besoins
      const data = await fetchWeatherForecast(insee, day);
      if (data) {
        forecasts.push(data);
      }
    }

    allForecasts.Weather[insee] = forecasts;
  }


  allForecasts.retrieved_at = now;  // Ajouter la date et l'heure de récupération des données

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const publicDir = path.join(__dirname, 'public', 'data');

  // Assurez-vous que le dossier public/data existe
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const filePath = path.join(publicDir, 'weatherPeriods.json');

  fs.writeFileSync(filePath, JSON.stringify(allForecasts, null, 2));
  console.log('Weather data saved successfully!');
};

saveData();
