import React from 'react'
import BarChart from '../../components/BarChart/BarChart';
import axios from 'axios';
import { baseUrl } from '../../utils/baseURL';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useState } from 'react';
import { useEffect } from 'react';
import PieChart from '../../components/PieChart/PieChart';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'



const Estatisticas = () => {
  const [dadosAluno, configurarDadosAluno] = useState(null);
  const [dadosModalidade, configurarDadosModalidade] = useState(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {

    axios.get(
      `${baseUrl}/estatisticas/dadosParaGraficoAlunosInscricao`
    ).then(resposta => configurarDadosAluno(resposta.data))
    .catch(err => console.error(err));
    
    axios.get(
      `${baseUrl}/estatisticas/dadosParaGraficoModalidades`
    ).then(resposta => configurarDadosModalidade(resposta.data))
    .catch(err => console.error(err));
  }, []);

  const barChart = 
  <div>
  <h1 className='mt-5 ml-5 text-white font-spartan'>Este gráfico mostra, mês a mês, o número de inscrições na academia.</h1>
  <BarChart data={dadosAluno} className='self-end'/>
  </div>;
  const pieChart =  
  <div>
  <h1 className='mt-5 ml-5 text-white font-spartan'>Este gráfico mostra a distribuição das modalidades, pelo total de alunos inscritos.</h1>
  <PieChart data={dadosModalidade} outerRadius={220} innerRadius={0} className='self-end'/>
  </div>;
  const graficos = [barChart, pieChart];
    
  const [indiceCorrente, configurarIndiceCorrente] = useState(0);

  const slideAnterior = () => {
    const primeiroSlide = indiceCorrente === 0;
    const novoIndice = primeiroSlide ? graficos.length - 1 : indiceCorrente - 1;
    configurarIndiceCorrente(novoIndice);
  }

  const proximoSlide = () => {
    const ultimoSlide = indiceCorrente === graficos.length - 1;
    const novoIndice = ultimoSlide ? 0 : indiceCorrente + 1;
    configurarIndiceCorrente(novoIndice);
  }

  return (
    <div>
      {isMobile ? <div>TODO</div> : (
        <div>
        <p>Gráficos</p>
        <div className='w-[1000px] h-[820px] m-auto py-16 px-4 relative group'>
          {dadosAluno && dadosModalidade ? 
          <>
          <div className='w-full h-full rounded-2xl bg-center bg-cover duration-500 bg-slate-400 flex'>
          {graficos[indiceCorrente]}
        </div>
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactLeft onClick={slideAnterior} size={30} />
        </div>
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactRight onClick={proximoSlide} size={30} />
        </div>
        </> : null 
        }
          
        </div>
  
        </div>
      )} 
    </div>
  )
}

export default Estatisticas