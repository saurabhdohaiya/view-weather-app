import React from 'react';
import Button from './Button';

interface SearchBarComponentProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSearchSubmit: () => void;
  className: string;
}

const SearchBarComponent: React.FC<SearchBarComponentProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearchSubmit,
  className
}) => {
  
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(e.target.value); 
  };

  const handleSearchButtonClick = () => {
    onSearchSubmit();
  };

  return (
    <div className={`flex flex-row gap-2 mb-4 ${className}`}>
      <input
        type="text"
        className="w-4/5 px-4 py-2 border rounded-full"
        placeholder="Search for a city"
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
      <Button onClick={handleSearchButtonClick} btnText='Search'/>
    </div>
  );
};

export default SearchBarComponent;
