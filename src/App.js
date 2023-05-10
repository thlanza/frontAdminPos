import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Nav from './components/Navigation/Nav';
import Modal from './components/Portal/Modal';
import Agenda from './pages/Agenda/Agenda';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Modalidades from './pages/Modalidades/Modalidades';
import PrimeiroLogin from './pages/PrimeiroLogin/PrimeiroLogin';
import Registrar from './pages/Registrar.jsx/Registrar';
import PrimeiroLoginRotasProtegidas from './pages/RotasProtegidas/PrimeiroLoginRotaProtegida';
import UltimoLoginRotasProtegidas from './pages/RotasProtegidas/UltimoLoginRotasProtegidas';
import { loadCldr } from '@syncfusion/ej2-base';
import Alunos from './pages/Alunos/Alunos';
import Estatisticas from './pages/Estatisticas/Estatisticas';
import PainelPresencas from './pages/PainelPresencas/PainelPresencas';
import PainelPresencasLista from './components/PainelPresencasLista/PainelPresencasLista';
import PainelComprovantes from './pages/PainelComprovantes/PainelComprovantes';

loadCldr(
  require('cldr-data/supplemental/numberingSystems.json'),
  require('cldr-data/main/pt/ca-gregorian.json'),
  require('cldr-data/main/pt/numbers.json'),
  require('cldr-data/main/pt/timeZoneNames.json')
  );

function App() {
  const admin = useSelector(state => state?.admin);
  const { primeiroLogin, usuarioLogado } = admin;

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={usuarioLogado ? <Navigate to="/home" /> : <Login />} />
        <Route path="/primeiroLogin" element={<PrimeiroLogin />} />
        <Route element={<PrimeiroLoginRotasProtegidas user={primeiroLogin} />} >
         <Route path="/registrar" element={<Registrar />} />
        </Route> 
        <Route element={<UltimoLoginRotasProtegidas usuarioLogado={usuarioLogado} />} >
            <Route path="/home" element={<Home />} />
            <Route path="/modalidades" element={<Modalidades />} />
            <Route path="/modal/:id" element={<Modal />} />
            <Route path="/novaModalidade" element={<Modal />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/alunos" element={<Alunos />} />
            <Route path="/estatisticas" element={<Estatisticas />} />
            <Route path="/painelPresencas" element={<PainelPresencas />} />
            <Route path="/painelPresencasLista" element={<PainelPresencasLista />} />
            <Route path="/painelComprovantes" element={<PainelComprovantes />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
