// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Electric from './pages/Electrics/Electrics';
// import Home from './pages/home';
// import RiceCoockers from './pages/Electrics/Ricecooker/Ricecoocker'
// import Ceremic from './pages/Ceremic/Ceremic'
// import PlasticMetal from './pages/PlasticMetal/PlasticMetal'
// import Iron from './pages/Electrics/iron/irons'
// import GasCooker  from './pages/Electrics/gascooker/gascooker'
// import Fan from './pages/Electrics/fans/fans'
// import Blender from './pages/Electrics/blender/blenders'
// import SoundSystems from './pages/Electrics/soundSystem/soundSystem'
// import Torch from './pages/Electrics/Torch/torchs'
// import Pay from './pages/pay'

// import LoginForm from './pages/login';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';

// const theme = createTheme();

// const App = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <AppContent />
//       </Router>
//     </ThemeProvider>
//   );
// };

// const AppContent = () => {
//   const location = useLocation();
//   const showNavbar = location.pathname !== '/login';

//   return (
//     <>
//       {showNavbar && <Navbar />}
//       <Routes>
         
//          <Route path="/" element={<Home />} />
//          <Route path="/login" element={<LoginForm />} />
//          <Route path="/electric" element={<Electric />} />
//          <Route path="/electric/ricecookers" element={<RiceCoockers />} />
//          <Route path="/electric/irons" element={<Iron />} />
//          <Route path="/electric/gascoockers" element={<GasCooker />} />
//          <Route path="/electric/fans" element={<Fan />} />
//          <Route path="/electric/blender" element={<Blender />} />
//          <Route path="/electric/soundsystems" element={<SoundSystems />} />
//          <Route path="/ceramic" element={<Ceremic />} />
//          <Route path="/plastic-metal" element={<PlasticMetal />} />
//          <Route path="/electric/torchs" element={<Torch />} />
//          <Route path="/pay" element={<Pay />} />
//       </Routes>
//     </>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Electric from './pages/Electrics/Electrics';
import Home from './pages/home';
import RiceCoockers from './pages/Electrics/Ricecooker/Ricecoocker';
import Ceremic from './pages/Ceremic/Ceremic';
import PlasticMetal from './pages/PlasticMetal/PlasticMetal';
import Iron from './pages/Electrics/iron/irons';
import GasCooker from './pages/Electrics/gascooker/gascooker';
import Fan from './pages/Electrics/fans/fans';
import Blender from './pages/Electrics/blender/blenders';
import SoundSystems from './pages/Electrics/soundSystem/soundSystem';
import Torch from './pages/Electrics/Torch/torchs';
import Pay from './pages/pay';
import LoginForm from './pages/login';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

const AppContent = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login';

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<PrivateRoute component={Home} />} />
        <Route path="/electric" element={<PrivateRoute component={Electric} />} />
        <Route path="/electric/ricecookers" element={<PrivateRoute component={RiceCoockers} />} />
        <Route path="/electric/irons" element={<PrivateRoute component={Iron} />} />
        <Route path="/electric/gascoockers" element={<PrivateRoute component={GasCooker} />} />
        <Route path="/electric/fans" element={<PrivateRoute component={Fan} />} />
        <Route path="/electric/blender" element={<PrivateRoute component={Blender} />} />
        <Route path="/electric/soundsystems" element={<PrivateRoute component={SoundSystems} />} />
        <Route path="/ceramic" element={<PrivateRoute component={Ceremic} />} />
        <Route path="/plastic-metal" element={<PrivateRoute component={PlasticMetal} />} />
        <Route path="/electric/torchs" element={<PrivateRoute component={Torch} />} />
        <Route path="/pay" element={<PrivateRoute component={Pay} />} />
      </Routes>
    </>
  );
};

const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default App;
