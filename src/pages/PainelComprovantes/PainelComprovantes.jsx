import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { ImCheckboxChecked } from 'react-icons/im'
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import Fila from '../../components/Fila/Fila';
import useMediaQuery from '../../hooks/useMediaQuery';
import { getComprovantesAction, validarComprovanteAction } from '../../redux/slices/admin/adminSlices';

const PainelComprovantes = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dispatch = useDispatch();
  const [listaComprovantes, configurarListaComprovantes] = useState([]);
  const [paginaAtual, configurarPaginaAtual] = useState(0);
  const POR_PAGINA = 4;
  const offset = paginaAtual * POR_PAGINA;


 const { painelDeComprovantes, appErr, serverErr, loading } = useSelector(state => state?.admin);

  useEffect(() => {
    dispatch(getComprovantesAction());
  }, []);

  useEffect(() => {
    configurarListaComprovantes(painelDeComprovantes);
  }, [painelDeComprovantes]);

  const tamanho = listaComprovantes?.length;

  const validar= (valido, id) => {
    if (valido === 'valido') {
      const requisicao = {
        valido: 'valido',
        idComprovante: id
      };
      dispatch(validarComprovanteAction(requisicao));
      return;
    } else {
      const requisicao = {
        valido: 'invalido',
        idComprovante: id
      };
      dispatch(validarComprovanteAction(requisicao));
      return;
    }
  };


  const paginaAtualDados = 
    loading?
     <ClipLoader /> : 
     appErr || serverErr ?
     <h1>Estamos com problemas nos nossos servidores. Tente novamente mais tarde.</h1> :
     listaComprovantes ? listaComprovantes
      .slice(offset, offset + POR_PAGINA)
      .map(elemento => 
      <div className='text-myblue border flex flex-col justify-end bg-mygray font-spartan mb-10'>
      <img src={elemento.urlFoto} alt="comprovante" />
      <Fila rotulo="Mês do comprovante" conteudo={elemento.mes}/>
      <Fila rotulo="Ano do comprante" conteudo={elemento.ano} /> 
      <div className='flex items-center justify-center bg-white border-t-2 border flex-col'>
      <button 
        onClick={() => {}}
        className='flex w-[100%] border-b justify-center text-[#258039]'>
          <ImCheckboxChecked 
            onClick={() => validar('valido', elemento._id)}
            color={"#258039"} 
            className='mr-1'/>
            <p className='valido'>Válido</p>
        </button>
        <button 
        onClick={() => validar('invalido', elemento._id)}
        className='flex w-[100%] justify-center text-myred'>
          <RiDeleteBin2Fill 
            color={"#FF4447"} 
            className='mr-1'/>
            <p className='invalido'>Inválido</p>
        </button>
        </div>
      </div>) : null;


  const contagemPaginas = Math.ceil(listaComprovantes?.length / POR_PAGINA);

  function handlePageClick({ selected: selectedPage }) {
    configurarPaginaAtual(selectedPage);
  }

  return (
    <div>
        {isMobile ?
        (<div>TODO</div>) : 
        (
            <div className='bg-mygray2 w-[calc(100vw-350px)] h-[100vh] border flex flex-col'>
            <div className='flex justify-center items-center w-[calc(100%)-0.75rem] bg-mygray m-[0.75rem] flex-col'>
             <h1 className='p-3 font-bakbak text-4xl text-myblue'>Painel de Comprovantes</h1>
             </div>
             <div className='flex justify-center items-center w-[calc(100%)-0.75rem] bg-mygray m-[0.75rem]'>
    {loading ?     <ClipLoader
                      color={"red"}
                      size={150}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    /> : appErr || serverErr ?    <h1 className='p-3 numero font-bakbak text-2xl text-red-600'>Estamos com problemas nos servidores. Tente novamente mais tarde.</h1>
    : <h1 className='p-3 numero font-bakbak text-2xl text-myblue'>{tamanho} comprovantes encontrados.</h1>}
  
    </div>
    <div className='flex justify-center'>
        <div className='mt-3 w-[100%] p-10'>
        <div className='grid grid-cols-4'>
        {paginaAtualDados}
        </div>


        <div className='flex justify-between items-center'>
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Próximo"}
          pageCount={contagemPaginas}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
          />

        </div>
        </div>

        </div>
             </div>
        )}
    </div>
  )
}

export default PainelComprovantes