export interface ICityGeoCode {
  country: string; // Country name
  country_code: string; // Country code
  country_id: number; // Country ID
  feature_code: string; // Feature code, such as "PPL" for populated places
  id: number; // Unique ID for the location
  latitude: number; // Latitude of the city
  longitude: number; // Longitude of the city
  name: string; // Name of the city
}

export interface ICurrentWeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string; // Temperature unit for 2 meters
    relative_humidity_2m: string; // Humidity unit for 2 meters
    apparent_temperature: string; // Apparent temperature unit
    precipitation: string; // Precipitation unit
    weather_code: string; // Weather condition code
    surface_pressure: string; // Surface pressure unit
    wind_speed_10m: string; // Wind speed unit at 10 meters
    wind_direction_10m: string; // Wind direction unit at 10 meters
  };
  current: {
    time: string; // Timestamp of the weather data
    interval: number; // Data collection interval in seconds
    temperature_2m: number; // Temperature in °C
    relative_humidity_2m: number; // Humidity in %
    apparent_temperature: number; // Apparent temperature in °C
    precipitation: number; // Precipitation in mm
    weather_code: number; // Weather code (used to determine the weather condition)
    surface_pressure: number; // Surface pressure in hPa
    wind_speed_10m: number; // Wind speed at 10 meters in km/h
    wind_direction_10m: number; // Wind direction at 10 meters in degrees
  };
}
