import express from 'express';
import { generateFakeWeatherData, generateUsersByTimezone } from './data/fakeData';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

interface Data {
  temperature: string;
  humidity: string;
  condition: string;
  users: number;
  timezone: number;
}

const data: Data[] = [];
for (let i = 0; i < 24; i++) {
  const weatherData = generateFakeWeatherData();
  data.push({
    temperature: weatherData.temperature,
    humidity: weatherData.humidity,
    condition: weatherData.condition,
    users: generateUsersByTimezone(i),
    timezone: i,
  })
}

const weatherInterval = setInterval(() => {
  for (let i = 0; i < 24; i++) {
    const weatherData = generateFakeWeatherData();
    data[i].timezone = i
    data[i].condition = weatherData.condition;
    data[i].humidity = weatherData.humidity;
    data[i].temperature = weatherData.temperature;
    data[i].users = generateUsersByTimezone(i);
  }
}, 1000 * 60 * 60);
weatherInterval;

setInterval(() => {
  for (let i = 0; i < 24; i++) {
    data[i].users = generateUsersByTimezone(i);
  }
}, 1000);

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders(); // Ensure headers are sent immediately

  console.log('requesting data');

  const interval = setInterval(() => {
    console.log('Interval?');
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    console.log('writing data to response');
    console.log(data);
  }, 1000);

  req.on('close', () => {
    console.log('Closing request');
    clearInterval(interval);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
