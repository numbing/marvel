import { Routes, Route, Navigate } from 'react-router-dom';
import ComicNavbar from './components/ComicNavbar';
import Attribution from './components/Attribution';
import SearchPage from './features/search/SearchPage';
import IssuePage from './pages/IssuePage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <div className="app-layout">
      <ComicNavbar />
      <main className="app-content ">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/issue/:id" element={<IssuePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Attribution />
    </div>
  );
};

export default App;
