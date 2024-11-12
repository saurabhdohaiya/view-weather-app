import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CityGeoCodeCardProps {
  city: string;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
  onSelectCity: () => void;
}

const CityGeoCodeCard: React.FC<CityGeoCodeCardProps> = ({
  city,
  country,
  country_code,
  latitude,
  longitude,
  onSelectCity,
}) => {
  const navigate = useNavigate();
  const [flagUrl, setFlagUrl] = useState<string>('');

  useEffect(() => {
    const fetchFlag = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${country_code}`);
        const data = await response.json();
        setFlagUrl(data[0].flags.png); 
      } catch (error) {
        console.error('Error fetching flag:', error);
      }
    };

    fetchFlag();
  }, [country_code]);

  const navigateToDetailPage = (city: string, latitude: number, longitude: number) => {
    navigate(`/weather?city_name=${city}&latitude=${latitude}&longitude=${longitude}`);
  };

  return (
    <div
      className="p-4 border rounded-md shadow-lg cursor-pointer flex gap-4 bg-gray-50"
      onClick={onSelectCity}
    >
      <div className="w-1/4 flex flex-row justify-center items-center">
        {flagUrl && (
          <img
            src={flagUrl}
            alt={`${country} flag`}
            className="w-full h-auto"
          />
        )}
      </div>

      <div className="w-full">
        <h3 className="text-xl font-semibold">{city}</h3>
        <p className="text-sm text-gray-500">{country}</p>
      </div>

      <div className="w-1/3 flex items-center justify-center">
        <div className="flex flex-row w-full items-center justify-end">
          <button
            className={`text-xs px-3 flex flex-row py-1 md:px-4 md:py-2 rounded-full border font-semibold border-primary text-primary transition-all duration-200 ease-in-out
            hover:bg-primary hover:text-white hover:font-semibold
            focus:bg-primary-dark focus:outline-none`}
            onClick={() => navigateToDetailPage(city, latitude, longitude)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityGeoCodeCard;
