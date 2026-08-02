import { Navigate, Route, Routes } from 'react-router-dom';
import SwiftOSHome from './pages/SwiftOSHome';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './swift-os.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SwiftOSHome />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;