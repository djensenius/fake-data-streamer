import express from 'express';
import { generateFakeWeatherData, generateUsersByTimezone } from './data/fakeData';

const app = express();
const PORT = process.env.PORT || 3000;

interface Data {
    temperature: string;
    humidity: string;
    condition: string;
    users: number;
}

const data: Data[] = [];
for (let i = 0; i < 24; i++) {
    const weatherData = generateFakeWeatherData();
    data.push({
        temperature: weatherData.temperature,
        humidity: weatherData.humidity,
        condition: weatherData.condition,
        users: generateUsersByTimezone(i),
    })
}

const weatherInterval = setInterval(() => {
    for (let i = 0; i < 24; i++) {
        const weatherData = generateFakeWeatherData();
        data[i].condition = weatherData.condition;
        data[i].humidity = weatherData.humidity;
        data[i].temperature = weatherData.temperature;
        data[i].users = generateUsersByTimezone(i);
       }
}, 1000 * 60 * 60);
weatherInterval;

const interval = setInterval(() => {
    for (let i = 0; i < 24; i++) {
        data[i].users = generateUsersByTimezone(i);
    }
}, 1000);


app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    console.log('requesting data');

    const interval = setInterval(() => {
        console.log('Interval?');
        res.write(JSON.stringify(data) + '\n');
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