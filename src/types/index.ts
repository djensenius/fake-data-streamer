export interface WeatherData {
    temperature: number;
    humidity: number;
    conditions: string;
}

export interface WeatherStream {
    subscribe(callback: (data: WeatherData) => void): void;
    unsubscribe(callback: (data: WeatherData) => void): void;
}