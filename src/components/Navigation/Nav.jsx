import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../Logo/Logo'
import { IoHomeSharp, IoCalendarOutline } from 'react-icons/io5';
import { FaUserGraduate } from "react-icons/fa"
import { AiOutlineOrderedList, AiOutlineLogout } from "react-icons/ai";
import { ImStatsDots } from "react-icons/im";
import { MdOutlineAttachMoney } from "react-icons/md"
import { logoutAction } from '../../redux/slices/admin/adminSlices';
import useMediaQuery from '../../hooks/useMediaQuery';
import { Link } from 'react-router-dom';

const IconLink = ({ icon, link, url, onClick }) => {
    return (
        <div className='flex mt-3 items-center'>
            {icon}
            <Link onClick={onClick} to={url} className='ml-3 text-white font-bakbak'>{link}</Link>
        </div>
    )
}

const Nav = ({ aoClicar }) => {
  const dispatch = useDispatch();
  const admin = useSelector(state => state?.admin);
  const { usuarioLogado } = admin;
  const fotoDePerfil = usuarioLogado?.usuario?.fotoDePerfil;
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className={isMobile ? 'h-screen overflow-hidden bg-myblack flex flex-col w-[100%]' : 'h-screen bg-myblack w-[350px] flex flex-col'}>
        <Logo small={true}/>
        <div className='flex flex-col items-center'>
            <div className='mt-3'>
            <img src={fotoDePerfil} className="w-36 h-36 ml-5 rounded-full object-cover" />
            </div>
            <p className='text-white mt-3 font-bakbak'>Perfil de Administrador</p>
            <div className='bg-white w-[320px] h-0.5 mt-3'></div>
        </div>
        <div className='ml-5'>
            <IconLink onClick={aoClicar} icon={<IoHomeSharp color="white" size={25} />} url="/home" link="Home" />
            <IconLink onClick={aoClicar} icon={<IoCalendarOutline color="white" size={24}/>} url="/agenda" link="Agenda" />
            <IconLink onClick={aoClicar} icon={<FaUserGraduate color="white" size={25} />} url="/alunos" link="Alunos" />
            <IconLink onClick={aoClicar} icon={<AiOutlineOrderedList color="white" size={25} />} url="/modalidades" link="Modalidades" />
            <IconLink onClick={aoClicar} icon={<ImStatsDots color="white" size={25} />} url="/estatisticas" link="Estatísticas" />
            <IconLink onClick={aoClicar} icon={<MdOutlineAttachMoney color="white" size={25} />} url="/pagamentos" link="Pagamentos" />
        </div>
        <div 
            className='text-white mt-16 flex cursor-pointer flex-col items-center font-spartan'
            onClick={() => dispatch(logoutAction())}
        >
            <AiOutlineLogout color="white" size={40} />
            <p>Deslogar</p>
        </div>
    </div>
  )
}

export default Nav