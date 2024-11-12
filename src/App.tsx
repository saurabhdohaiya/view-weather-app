import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import WeatherDetailPage from './components/WeatherDetailPage';
import { TemperatureProvider } from './contexts/TempratureUnitContext';

const App: React.FC = () => {
  return (
    <Router>
      <TemperatureProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<WeatherDetailPage />} />
        </Routes>
      </Layout>
      </TemperatureProvider>
    </Router>
  );
};

export default App;
