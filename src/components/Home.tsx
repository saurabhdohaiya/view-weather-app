import React, { useState } from 'react';
import WeatherCardShimmer from './WeatherCardShimmer';
import SearchBarComponent from './SearchBarComponent';
import { fetchCoordinates } from '../services/weatherService';
import CityGeoCodeCard from './CityGeoCodeCard';
import { ICityGeoCode } from '../types/types';
import ShimmerLine from './ShimmerLine';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [cityResults, setCityResults] = useState<ICityGeoCode[]>([]); 
  const [selectedCity, setSelectedCity] = useState<any | null>(null); 
  const [hasSearched, setHasSearched] = useState<boolean>(false); 

  const fetchCityData = async (term: string) => {
    if (term.trim() === '') return;

    try {
      setLoading(true);
      const response = await fetchCoordinates(term); 
      if (response.length > 0) {
        setCityResults(response); 
      } else {
        setCityResults([]);
        setError('No cities found for this search.');
      }
    } catch (error) {
      setError('Failed to fetch city data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleSubmitSearchTerm = () => {
    setHasSearched(true); 
    fetchCityData(searchTerm); 
  };

  const handleCitySelect = (city: any) => {
    setSelectedCity(city);
    setCityResults([]); 
    setSearchTerm(city.city);
  };

  if (loading) {
    return (
      <div className="container md:w-1/2 mx-auto p-4 px-6 md:px-8 h-full">
        <div className="w-1/2 flex flex-row gap-4 justify-center mt-8 md:mt-16">
          <ShimmerLine className="w-4/5 h-6 mb-2 !rounded" /> 
          <ShimmerLine className="w-1/5 h-6 mb-2 !rounded" /> 
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {Array.from({ length: 6 }, (_, index) => (
            <WeatherCardShimmer key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full md:w-3/5 mx-auto p-4 px-6 md:px-8 h-full">
      <SearchBarComponent
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
        onSearchSubmit={handleSubmitSearchTerm}
        className={"mt-8 md:mt-16 w-full md:w-1/2"}
      />

      {searchTerm.trim() === '' && (
        <div className="mt-8 p-4 border border-gray-300 bg-gray-50 rounded-md">
          <p className="font-semibold">How to Search:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Enter the name of the city you want to search for.</li>
            <li>Make sure the spelling is correct.</li>
            <li>Click the "Search" button to find matching cities.</li>
            <li>Click on a city to view more details.</li>
          </ul>
        </div>
      )}

      <div>
        {hasSearched && cityResults.length === 0 && (
          <div>
            <p className="font-semibold">
              Search Result: {searchTerm ? `${cityResults.length} results for "${searchTerm}"` : 'No search term entered'}
            </p>
            <p className="mt-4 text-gray-500">No cities found. Try changing your search.</p>
          </div>
        )}
        {hasSearched && cityResults.length > 0 && (
          <div className='flex flex-col justify-center items-center'>
            <p className="font-semibold">
              Search Result: {searchTerm ? `${cityResults.length} results for "${searchTerm}"` : 'No search term entered'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              {cityResults.map((city: ICityGeoCode) => (
                <CityGeoCodeCard
                  key={city.id}
                  city={city.name}
                  country={city.country}
                  country_code={city.country_code}
                  latitude={city.latitude}
                  longitude={city.longitude}
                  onSelectCity={() => handleCitySelect(city)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
