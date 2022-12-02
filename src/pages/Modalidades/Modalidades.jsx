import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletarModalidadeAction, getModalidadesAction } from '../../redux/slices/modalidades/modalidadeSlices';
import { MdEditNote } from 'react-icons/md';
import { RiDeleteBin2Fill } from 'react-icons/ri';


const Modalidades = () => {
  const dispatch = useDispatch();

  const modalidadesList = useSelector(state => state?.modalidades);
  const { modalidades, modalidadeDeletada, appErr, serverErr, loading } = modalidadesList;

  useEffect(() => {
    dispatch(getModalidadesAction());
  }, [dispatch, modalidadeDeletada]);

  return (
    <div className='bg-mygray2 w-screen justify-center'>
        <div className='flex justify-center'>
            <p className='font-bakbak text-myblue mt-3 text-4xl'>Modalidades</p>
        </div>
        <div className='flex flex-col items-center'>
        <div className={modalidades?.length === 0 || appErr || serverErr ? 'bg-mygray p-2 mt-8 w-[1070px] grid grid-cols-4 font-spartan' : 'bg-myblack p-2 mt-8 w-[1070px] grid grid-cols-4 font-spartan'}>
        {appErr || serverErr ? 
        <h1 className='text-black h-[300px] text-5xl flex items-center justify-center w-[1070px]'>{appErr} {serverErr}</h1> :
        modalidades?.length === 0 ? 
        <h1 className='text-black h-[300px] text-5xl flex items-center justify-center w-[1070px]'>Sem modalidades no momento!</h1>
        : modalidades?.map((modalidade, index) => (
                <>
                <div className='bg-mygray'>
                {index === 0? <p className='flex justify-center text-2xl mb-1 bg-myblack text-'>Nome da Modalidade</p> : null}
                  <p className='mb-1 flex justify-center'>{modalidade.nomeModalidade}</p>
                </div>
                  <div className='bg-mygray'>
                    {index === 0? <p className='flex justify-center text-2xl mb-1 bg-myblack text-white'>Horários</p> : null}
                    <p className='mb-1 flex justify-center'>{modalidade.horario}</p>
                  </div>
                  <div className='bg-mygray'>
                    {index === 0? <p className='flex justify-center text-2xl mb-1 bg-myblack text-white'>Número de alunos</p> : null}
                    <p className='mb-1 flex justify-center'>{modalidade.alunos.length}</p>
                  </div>
                  <div className='bg-mygray'>
                    {index === 0? <p className='flex justify-center text-2xl mb-1 bg-myblack text-white'>Editar / Deletar</p> : null}
                    <div className='flex justify-center mb-1'>
                    <MdEditNote className='mr-3'/>
                    <button onClick={() => dispatch(deletarModalidadeAction(modalidade._id))}><RiDeleteBin2Fill /></button>           
                    </div>
                  </div>   
                </>
               ))}
        </div>
           
            <div className='h-[250px] bg-mygray w-[1070px] border-t-2 border-myblue'>lalalalal</div>
        </div>
    </div>
  )
}

export default Modalidades