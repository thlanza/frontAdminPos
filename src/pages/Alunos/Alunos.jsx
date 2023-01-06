import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAlunosAction } from '../../redux/slices/alunos/alunosSlices';
import ReactPaginate from 'react-paginate';
import Fila from '../../components/Fila/Fila';
import { RiDeleteBin2Fill } from 'react-icons/ri'

const Alunos = () => {
  const dispatch = useDispatch();
  const [alunosList, configurarAlunos] = useState([]);
  const [paginaAtual, configurarPaginaAtual] = useState(0);
  const POR_PAGINA = 8;
  const offset = paginaAtual * POR_PAGINA;

  useEffect(() => {
    dispatch(getAlunosAction());
  }, []);

  const { alunos } = useSelector(state => state?.alunos);

  useEffect(() => {
    configurarAlunos(alunos);
  }, [alunos]);

  const inadimplente = (valor) => {
    if (valor === false) {
        return "Não"
    } 
    if (valor === true) {
        return "Sim"
    }
  }

  const paginaAtualDados = alunosList
    .slice(offset, offset + POR_PAGINA)
    .map(elemento => 
    <div className='text-myblue border flex flex-col justify-center bg-mygray font-spartan'>
    <img src={elemento.fotoDePerfil} alt="foto De Perfil" />
    <Fila rotulo="Primeiro Nome: " conteudo={elemento.primeiroNome}/>
    <Fila rotulo="Sobrenome: " conteudo={elemento.sobrenome} /> 
    <Fila rotulo="Modalidade: " conteudo={elemento.modalidade.nomeModalidade}  />
    <Fila rotulo="Email: " conteudo={elemento.email} />
    <Fila rotulo="Inadimplente?" conteudo={inadimplente(elemento.inadimplente)} />
    <Fila rotulo="Meses Inadimplente: " conteudo={elemento.mesesInadimplente} />
    <div className='flex items-center justify-center bg-white text-myred'><button className='flex'><RiDeleteBin2Fill color={"#FF4447"} className='mr-1'/>Deletar</button></div>
    </div>
    );

  const contagemPaginas = Math.ceil(alunosList.length / POR_PAGINA);

  function handlePageClick({ selected: selectedPage }) {
    configurarPaginaAtual(selectedPage);
  }

  return (
    <div className='border w-screen bg-mygray2'>
    <div className='flex justify-center items-center w-[calc(100%)-0.75rem] bg-mygray m-[0.75rem]'>
    <h1 className='p-3 font-bakbak text-4xl text-myblue'>Dashboard de Alunos</h1>
    </div>
    <div className='flex justify-center'>
        <div className='mt-3 w-[100%] p-10'>
        <div className='grid grid-cols-4'>
        {paginaAtualDados}
        </div>
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
  )
}

export default Alunos