export const fetchCoordinates = async (cityName: string) => {
  const geocodeEndpoint = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`; 

  try {
    const response = await fetch(geocodeEndpoint);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results.map((cityData: any) => {
        const {
          country,
          country_code,
          country_id,
          feature_code,
          id,
          latitude,
          longitude,
          name,
        } = cityData;

        return{
          name,
          id,
          latitude,
          longitude,
          country_id,
          country_code,
          country,
          feature_code,
        }
      });
    }

    return []; 

  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return []; 
  }
};

export const fetchCurrentWeatherByCity = async (latitude: string, longitude:string) => {
  try {
    const response = await fetch(`
      https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
