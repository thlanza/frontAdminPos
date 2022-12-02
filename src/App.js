import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Navigation/Nav';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Modalidades from './pages/Modalidades/Modalidades';
import PrimeiroLogin from './pages/PrimeiroLogin/PrimeiroLogin';
import Registrar from './pages/Registrar.jsx/Registrar';
import PrimeiroLoginRotasProtegidas from './pages/RotasProtegidas/PrimeiroLoginRotaProtegida';
import UltimoLoginRotasProtegidas from './pages/RotasProtegidas/UltimoLoginRotasProtegidas';

function App() {
  const admin = useSelector(state => state?.admin);
  const { primeiroLogin, usuarioLogado } = admin;

  return (
    <Router>
      <Routes>
        <Route path="/" element={usuarioLogado ? <Navigate to="/home" /> : <Login />} />
        <Route path="/primeiroLogin" element={<PrimeiroLogin />} />
        <Route element={<PrimeiroLoginRotasProtegidas user={primeiroLogin} />} >
         <Route path="/registrar" element={<Registrar />} />
        </Route> 
        <Route element={<UltimoLoginRotasProtegidas usuarioLogado={usuarioLogado} />} >
            <Route path="/home" element={<Home />} />
            <Route path="/modalidades" element={<Modalidades />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
