import LocationController from './src/Components/LocationController';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Map from './src/Components/Map';
import { GeoDataContextProvider } from './src/Context/geoDataContext';

export default function App() {
  return (
    <BrowserRouter>
      <GeoDataContextProvider>
        <Routes>
          <Route path='/' element={<LocationController />} />
          <Route path='/map' element={<Map />} />
        </Routes>
      </GeoDataContextProvider>
    </BrowserRouter>
  );
}
