import { Navigate, Outlet } from 'react-router-dom';
import Nav from '../../components/Navigation/Nav';
import useMediaQuery from '../../hooks/useMediaQuery';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { useRef } from 'react';

const UltimoLoginRotasProtegidas = ({ usuarioLogado }) => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const navigationRef = useRef();

    if (!usuarioLogado) {
      return <Navigate to="/primeiroLogin" />
    }

    const setNav = () => {
      return navigationRef.current?.classList.toggle('inactive');
    }
  

    return (
     <>
    {isMobile ? (
      <div className='relative transition-all duration-500'>
        <Outlet />
        <div className='absolute top-2 right-2'>
          <GiHamburgerMenu size={35} onClick={() => setNav()}/>
          <p className='font-spartan'>Menu</p>
        </div>
        <div 
          ref={navigationRef}
          className='absolute inset-0 transition-all duration-500 w-[100%]'>
            <div className='absolute top-2 right-2'>
              <AiOutlineClose size={35} onClick={() => setNav()}/>
            </div>
          <Nav />
        </div>

      </div>
    ) :(
      <div className='flex'>
      <Nav />
      <Outlet />
    </div>
    )}  
    </>
    )

  }
  
export default UltimoLoginRotasProtegidas