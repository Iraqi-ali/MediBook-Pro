import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClinicDetail from './pages/ClinicDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/clinic/:id" element={<ClinicDetail />} />
    </Routes>
  );
}

export default App;
