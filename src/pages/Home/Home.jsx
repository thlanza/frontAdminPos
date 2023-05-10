import React from 'react'
import { ImArrowRight } from "react-icons/im";
import axios from 'axios';
import { baseUrl } from '../../utils/baseURL';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';


const Home = () => {
  const msgErro = "Estamos com problemas nos nossos servidores e não poderemos exibir estatísticas. Tente novamente mais tarde"
  const [numero, configurarNumero] = useState("-");
  const [indice, configurarIndice] = useState("-");
  const [erro, configurarErro] = useState("");
  const [carregando, configurarCarregando] = useState(true);
  axios.get(`${baseUrl}/admin/numero`).then((response) => {
    configurarNumero(response.data.numero);
    configurarCarregando(false);
  }).catch((err) => {
    console.log(err)
    configurarCarregando(false);
    return configurarErro(msgErro);
  });
  axios.get(`${baseUrl}/admin/indice`).then((response) => {
    let indice = `${response.data.indice}%`;
    configurarIndice(indice);
    configurarCarregando(false);
  }).catch((err) => {
    console.log(err);
    configurarCarregando(false);
    return configurarErro(msgErro);
  });
  return (
    <div className='border w-screen bg-mygray2'>
      <div className='bem-vindo flex justify-center items-center w-[calc(100%)-0.75rem] bg-mygray m-[0.75rem]'>
      <h1 className='p-3 font-bakbak text-4xl text-myblue'>BEM-VINDO(A) À ACADEMIA LANZA!</h1>
      </div>
      <div className='flex justify-start items-center w-[calc(100%)-0.75rem] bg-mygray m-[0.75rem]'>
        {carregando ? <ClipLoader /> : null}
        <p className='p-3 font-spartan text-5xl text-myblue bg-mygray'>{erro ? erro : carregando ? "Carregando":  "Estatísticas principais:"}</p>
      </div>
      <div className='flex justify-start items-center w-[calc(100%)-0.75rem] bg-mygray m-[0.75rem]'>
        <ImArrowRight 
          size={40} 
          color={"#315199"} 
          className="ml-5"
        />
        <p className='p-3 font-spartan text-4xl text-myblue bg-mygray'>Número de alunos: {numero}</p>
      </div>
      <div className='flex justify-start items-center w-[calc(100%)-0.75rem] bg-mygray m-[0.75rem]'>
      <ImArrowRight 
          size={40} 
          color={"#315199"} 
          className="ml-5"
        />
        <p className='p-3 font-spartan text-4xl text-myblue bg-mygray'>Índice de Inadimplência: {indice}</p>
      </div>
      <div className='flex justify-start items-center w-[calc(100%)-0.75rem] bg-mygray m-[0.75rem]'>
        <p className='p-3 font-spartan text-4xl text-myblue bg-mygray'>Para estatísticas mais aprofundadas, clique no link "Estatísticas"!</p>
      </div>

      </div>
  )
}

export default Home