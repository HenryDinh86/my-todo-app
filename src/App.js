import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import Edit from './pages/Edit';
import NotFound from './pages/NotFound';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='*' element={<NotFound />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<ResponsiveDrawer />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/create' element={<Create />} />
            <Route path='/edit/:id' element={<Edit />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
