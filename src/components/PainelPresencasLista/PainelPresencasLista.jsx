import React from 'react'
import { useLocation } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';

const PainelPresencasLista = () => {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  let { presencas, dataDaPresenca, nomeModalidade } = location.state;
  presencas ||= [];
  dataDaPresenca ||= '';
  nomeModalidade ||= '';
  return (
    <div className='bg-mygray2'>{isMobile ? 
    (
        <div>TODO</div>
    ) : 
    (
            <div className='bg-mygray2 w-[calc(100vw-335px)] flex flex-col'>
                    <div className='flex justify-center items-center w-[calc(100%)-0.75rem] bg-mygray m-[0.75rem] flex-col'>
                        <h1 className='p-3 font-bakbak text-4xl text-myblue'>Lista de presença para o dia {dataDaPresenca}</h1>
                        <h1 className='p-3 font-bakbak text-2xl text-myblue'>Modalidade:  {nomeModalidade}</h1>
                    </div>
                    <div className='flex justify-center items-center w-[calc(100%)-0.75rem] bg-mygray m-[0.75rem] flex-col'>
                        {presencas.map(element => (
                            <p className='text-black font-spartan'>{element.nomeAluno} : {element.presenca}</p>
                        ))}
                    </div>
        </div>
        
    )
    }</div>
  )
}

export default PainelPresencasLista