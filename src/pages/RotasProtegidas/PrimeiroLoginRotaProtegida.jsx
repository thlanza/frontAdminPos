import { Navigate, Outlet } from 'react-router-dom';

const PrimeiroLoginRotasProtegidas = ({ user}) => {
    if (!user) {
      return <Navigate to="/primeiroLogin" />
    }
  
    return <Outlet />;
  }
  
export default PrimeiroLoginRotasProtegidas