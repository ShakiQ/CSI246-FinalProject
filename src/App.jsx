
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Profile from '../components/Profile';
import BrowserFeature from '../components/BrowserFeature';
import DataList from '../components/DataList';
import Settings from '../components/Settings';
import Camera from '../components/Camera';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/browser-feature" element={<BrowserFeature />} />
        <Route path="/data-list" element={<DataList />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/camera" element={<Camera />} />
      </Routes>
    </Router>
  );
};

export default App;
