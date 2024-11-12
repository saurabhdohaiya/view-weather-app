import { DIRECTIONS } from "../constants/constant";

export function degreeToDirection(degree: number) {
    const index = Math.floor((degree % 360) / 22.5);
    return DIRECTIONS[index];
}

export function convertToFahrenheit(temperature: number): number {
    return parseFloat((temperature * 9/5 + 32).toFixed(1));
}

export const weatherCodeToCondition = (weatherCode: number) => {
    switch (weatherCode) {
      case 0:
        return { condition: "Clear sky", icon: "🌞" };
      case 1:
        return { condition: "Mainly clear", icon: "🌤" };
      case 2:
        return { condition: "Partly cloudy", icon: "⛅" };
      case 3:
        return { condition: "Cloudy", icon: "☁️" };
      case 45:
        return { condition: "Fog", icon: "🌫️" };
      case 48:
        return { condition: "Depositing rime fog", icon: "❄️" };
      case 51:
        return { condition: "Light drizzle", icon: "🌧️" };
      case 53:
        return { condition: "Moderate drizzle", icon: "🌧️" };
      case 61:
        return { condition: "Light rain showers", icon: "🌦️" };
      case 63:
        return { condition: "Moderate rain showers", icon: "🌧️" };
      case 80:
        return { condition: "Heavy rain showers", icon: "🌧️" };
      case 95:
        return { condition: "Thunderstorms", icon: "⛈️" };
      case 99:
        return { condition: "Thunderstorms with hail", icon: "🌩️" };
      default:
        return { condition: "Unknown", icon: "❓" };
    }
  };