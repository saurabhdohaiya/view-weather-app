import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTemperatureUnit } from '../contexts/TempratureUnitContext';
import ShimmerLine from './ShimmerLine';
import { BiDroplet } from "react-icons/bi";
import { FaWind } from "react-icons/fa";
import { LuGaugeCircle } from "react-icons/lu";
import { UPDATE_WEATHER_INTERVAL } from '../constants/constant';
import { ICurrentWeatherResponse } from '../types/types';
import { fetchCurrentWeatherByCity } from '../services/weatherService';
import { convertToFahrenheit, degreeToDirection, weatherCodeToCondition } from '../services/utilityService';

const WeatherDetailPage: React.FC = () => {
  const { unit } = useTemperatureUnit();
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search); 

  const city_name = queryParams.get('city_name');
  const latitude = queryParams.get('latitude');
  const longitude = queryParams.get('longitude');

  const [weatherData, setWeatherData] = useState<ICurrentWeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (latitude && longitude && city_name) {
      fetchWeatherByCity(latitude, longitude);  
      const intervalId = setInterval(() => fetchWeatherByCity(latitude, longitude), UPDATE_WEATHER_INTERVAL * 1000);
      return () => clearInterval(intervalId);
    } else {
      setError('Invalid city name or coordinates. Please provide valid values.');
    }
  }, [latitude, longitude, city_name]);

  const fetchWeatherByCity = async (latitude: string, longitude: string) => {
    try {
      const data = await fetchCurrentWeatherByCity(latitude, longitude);
      console.log(data.current_weather);
      if (data) {
        setWeatherData(data);
      } else {
        setError('Invalid weather data received.');
      }
    } catch (error) {
      setError('Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container md:w-1/2 mx-auto p-4">
        <div className="space-y-4 mt-8 md:mt-8">
          <ShimmerLine className="w-2/3 h-6 mb-4" />
          <div className="bg-white border shadow-md rounded-lg p-4 space-y-4">
            <ShimmerLine className="w-1/2 h-4" />
            <div className="flex justify-between">
              <div>
                <ShimmerLine className="w-1/3 h-6 mb-2" />
                <ShimmerLine className="w-1/4 h-4" />
              </div>
              <ShimmerLine className="w-24 h-24 rounded-full" />
            </div>
            <div className="flex space-x-8">
              <ShimmerLine className="w-1/5 h-4" />
              <ShimmerLine className="w-1/5 h-4" />
              <ShimmerLine className="w-1/5 h-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container md:w-1/2 mx-auto p-4">
      {weatherData ? (
        <div className="space-y-4">
          <p className="text-3xl font-bold mt-4">{city_name}</p>
          <div className="bg-white border shadow-md rounded-lg p-4">
            <p className="text-sm text-gray-400">{new Date().toLocaleDateString()}</p>

            <div className="flex justify-between border-b-2 border-primary py-4">
              <div>
                <p className="text-gray-600 text-3xl font-bold">
                  {unit === 'F' ? convertToFahrenheit(weatherData.current.temperature_2m) : weatherData.current.temperature_2m}°{unit}
                </p>
                <p className="text-sm text-gray-400">
                  Feels like: {unit === 'F' ? convertToFahrenheit(weatherData.current.apparent_temperature) : weatherData.current.apparent_temperature}°{unit}
                </p>
              </div>
              <div className="flex flex-col items-center">
                {/* Weather condition and icon */}
                <p className="text-gray-600 text-5xl">{weatherCodeToCondition(weatherData.current.weather_code).icon}</p>
                <p className="text-gray-600 text-sm font-semibold mt-2">{weatherCodeToCondition(weatherData.current.weather_code).condition}</p>
              </div>
            </div>

            <div className="flex space-x-8 pt-4">
              <div className="flex items-center gap-1">
                <BiDroplet className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold">{weatherData.current.precipitation} %</p>
              </div>
              <div className="flex items-center gap-1">
                <FaWind className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold">
                  {weatherData.current.wind_speed_10m} m/s, {degreeToDirection(weatherData.current.wind_direction_10m)}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <LuGaugeCircle className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold">{weatherData.current.surface_pressure} hPa</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>{error || "Loading weather details..."}</p>
      )}
    </div>
  );
};

export default WeatherDetailPage;
