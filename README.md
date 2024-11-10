# Fake Data Streamer

This project is a simple Node.js application that streams fake weather data to connected clients. It simulates weather conditions such as temperature, humidity, and general weather conditions.

## Project Structure

```
weather-data-streamer
├── src
│   ├── app.ts                # Entry point of the application
│   ├── data
│   │   └── fakeData.ts # Generates fake data
│   └── types
│       └── index.ts          # Type definitions for weather data
├── package.json              # npm configuration file
├── tsconfig.json             # TypeScript configuration file
└── README.md                 # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/weather-data-streamer.git
   ```

2. Navigate to the project directory:

   ```
   cd weather-data-streamer
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Running the Application

To start the application, run the following command:

```
npm start
```

The server will start and listen for connections. You can connect to the server to receive streamed weather data.

### API

The application streams weather data in real-time. You can connect to the server using a WebSocket client to receive updates on weather conditions.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.