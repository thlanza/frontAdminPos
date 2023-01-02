import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletarModalidadeAction, getModalidadesAction } from '../../redux/slices/modalidades/modalidadeSlices';
import { MdEditNote } from 'react-icons/md';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useState } from 'react';
import { VscNewFolder } from 'react-icons/vsc'
import { Link } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const Modalidades = () => {
  const dispatch = useDispatch();
  const [estaAberto, configurarAberto] = useState(false);
  const [idConfig, setIdConfig] = useState(null);

  const modalidadesList = useSelector(state => state?.modalidades);
  const { modalidades, modalidadeDeletada, appErr, serverErr, loading } = modalidadesList;

  const isMobile = useMediaQuery("(max-width: 768px)");


  useEffect(() => {
    dispatch(getModalidadesAction());
  }, [dispatch, modalidadeDeletada]);

  return (
     <div className='w-screen bg-mygray2'>
      {isMobile? (
        <div className='bg-mygray2 w-screen'>
          <p className='font-bakbak text-myblue pt-16 text-4xl pb-5'>Modalidades</p>
          <Link to="/novaModalidade" state={{ new: true }} className=' bg-mygray border-2 mb-2 border-myblue flex justify-center items-center cursor-pointer'>
                <VscNewFolder size={50} color={"#315199"}/>
                <p className='ml-3 font-bakbak text-myblue'>Criar nova modalidade</p>
          </Link>
          {appErr || serverErr ? 
          <h1 className='text-black h-[300px] text-5xl flex items-center justify-center'>{appErr} {serverErr}</h1>
           : modalidades?.length === 0 ?
           <h1 className='text-black h-[300px] text-5xl flex items-center justify-center'>Sem modalidades no momento!</h1>
           : modalidades?.map((modalidade, index) => {
          const dias = modalidade.dias  
            return (
            <div className='mb-2'>
              <div className='grid grid-cols-2'>
                <div className='pl-5 bg-myblack text-white border'>Nome</div>
                <div className='bg-white border border-black'>{modalidade?.nomeModalidade}</div>
              </div>
              <div className='grid grid-cols-2'>
                <div className='pl-5 bg-myblack text-white border'>Horário</div>
                <div className='bg-white border border-black'>{modalidade?.horario}</div>
              </div>
              <div className='grid grid-cols-2'>
                <div className='pl-5 bg-myblack text-white border'>Dias</div>
                <div className='bg-white border border-black'>
                {dias.map(element => (
                  <p>{element}</p>
                ))}
                </div>
              </div>
              <div className='grid grid-cols-2'>
                <div className='pl-5 bg-myblack text-white border'>Número de alunos</div>
                <div className='bg-white border border-black'>{modalidade?.alunos?.length}</div>
              </div>
              <div className='grid grid-cols-2 bg-myblack border'>
                    <div className='flex flex-col justify-center items-center'>
                      <p className='text-white'>Editar</p>
                      <Link to={`/modal/${modalidade?._id}`} state={{ new: false }}><MdEditNote className='mr-3' color='#fff'/></Link> 
                     </div>
                      <div className='flex flex-col justify-center items-center'>
                        <p className='text-white'>Deletar</p>
                        <button onClick={() => dispatch(deletarModalidadeAction(modalidade._id))}><RiDeleteBin2Fill color='#fff' /></button>
                      </div>      
                  </div>   
            </div>
           )})
          }
        </div>
      ) : (
        <div className='bg-mygray2 justify-center pl-10'>
  
        <div className='flex justify-center'>
            <p className='font-bakbak text-myblue mt-16 text-4xl'>Modalidades</p>
        </div>
        <div className='flex flex-col items-center'>
        <div className={modalidades?.length === 0 || appErr || serverErr ? 'bg-mygray p-2 mt-8 grid grid-cols-5 w-[1070px] font-spartan' : 'bg-myblack p-2 mt-8 w-[1070px] grid grid-cols-5 font-spartan'}>
        {appErr || serverErr ? 
        <h1 className='text-black h-[300px] text-5xl flex items-center justify-center'>{appErr} {serverErr}</h1> :
        modalidades?.length === 0 ? 
        <h1 className='text-black h-[300px] text-5xl flex items-center justify-center'>Sem modalidades no momento!</h1>
        : modalidades?.map((modalidade, index) => {
              
              return (
                <>
                <div className='bg-mygray'>
                {index === 0? <p className='flex justify-center text-2xl mb-1 bg-myblack text-white'>Nome da Modalidade</p> : null}
                  <p className='mb-1 flex justify-center'>{modalidade.nomeModalidade}</p>
                </div>
                  <div className='bg-mygray'>
                    {index === 0? <p className='flex justify-center text-2xl mb-1 bg-myblack text-white'>Horários</p> : null}
                    <p className='mb-1 flex justify-center'>{modalidade.horario}</p>
                  </div>
                  <div className='bg-mygray'>
                    {index === 0? <p className='flex justify-center text-2xl mb-1 bg-myblack text-white'>Dias</p> : null}
                    <div className='mb-1 flex justify-center'>{modalidade.dias.map((element, index, arr) => {
                    return (
                    <p className='pr-1'>{element}{index == (arr.length -1) ? null : ', '}</p>
                    )
                    })
                  }</div>
                  </div>
                  <div className='bg-mygray'>
                    {index === 0? <p className='flex justify-center text-2xl mb-1 bg-myblack text-white'>Número de alunos</p> : null}
                    <p className='mb-1 flex justify-center'>{modalidade.alunos.length}</p>
                  </div>
                  <div className='bg-mygray'>
                    {index === 0? <p className='flex justify-center text-2xl mb-1 bg-myblack text-white'>Editar / Deletar</p> : null}
                    <div className='flex justify-center mb-1'>
                    <Link to={`/modal/${modalidade?._id}`} state={{ new: false }}><MdEditNote className='mr-3'/></Link>  
                    <button onClick={() => dispatch(deletarModalidadeAction(modalidade._id))}><RiDeleteBin2Fill /></button>           
                    </div>
                  </div>   
                </>
              )
})}
        </div>
               
            <Link to="/novaModalidade" state={{ new: true }} className='h-[250px] bg-mygray w-[1070px] border-t-2 border-myblue flex justify-center items-center cursor-pointer'>
                <VscNewFolder size={50} color={"#315199"}/>
                <p className='ml-3 font-bakbak text-myblue'>Criar nova modalidade</p>
            </Link>
        </div>
    </div>
      )}
     </div>
  )
}

export default Modalidades