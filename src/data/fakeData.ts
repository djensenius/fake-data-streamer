function generateFakeWeatherData() {
    const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Stormy', 'Snowy'];
    
    return {
        temperature: (Math.random() * 40).toFixed(2), // Temperature in Celsius
        humidity: (Math.random() * 100).toFixed(2), // Humidity in percentage
        condition: conditions[Math.floor(Math.random() * conditions.length)], // Random weather condition
    };
}

function generateByTimezone() {
    for (let i = 0; i < 24; i++) {
        const data = generateFakeWeatherData();
        console.log(`${i}:00: ${data.temperature}°C, ${data.humidity}%, ${data.condition}`);
    }
}

function weightNumberByTime(time: Number) {
    if (time >= 0 && time < 6) {
        return 0.1;
    } else if (time >= 6 && time < 12) {
        return 0.5;
    } else if (time >= 12 && time < 18) {
        return 0.7;
    } else if (time >= 18 && time < 24) {
        return 0.9;
    } else {
        return 0.1;
    }
}

function generateUsersByTimezone(time: Number) {
    const users = [];
    const weight = weightNumberByTime(time);
    const min = Math.floor(100000 * weight);
    const max = 100000;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    const numberOfUsers = Math.floor(random * weight);
    return numberOfUsers;
}

export { generateFakeWeatherData, generateUsersByTimezone };