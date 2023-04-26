import React from 'react'
import BarChart from '../../components/BarChart/BarChart';
import axios from 'axios';
import { baseUrl } from '../../utils/baseURL';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useState } from 'react';
import { useEffect } from 'react';
import PieChart from '../../components/PieChart/PieChart';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import Barchart2 from '../../components/BarChart/BarChart2';
import PieChart2 from '../../components/PieChart/PieChart2';
import BarChart3 from '../../components/BarChart/BarChart3';



const Estatisticas = () => {
  const [dadosAluno, configurarDadosAluno] = useState(null);
  const [dadosModalidade, configurarDadosModalidade] = useState(null);
  const [dadosInadimplencia, configurarDadosInadimplencia] = useState(null);
  const [dadosMesesInadimplente, configurarDadosMesesInadimplente] = useState(null);
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

    axios.get(
      `${baseUrl}/estatisticas/dadosParaGraficoInadimplencia`
    ).then(resposta => configurarDadosInadimplencia(resposta.data))
    .catch(err => console.error(err));

    axios.get(
      `${baseUrl}/estatisticas/dadosParaGraficoMesesInadimplencia`
    ).then(resposta => configurarDadosMesesInadimplente(resposta.data))
    .catch(err => console.error(err));
  }, []);

  const barChart = 
  <div>
  <h1 className='mt-5 ml-5 text-white font-spartan'>Este gráfico mostra, mês a mês, o número de inscrições na academia.</h1>
  <BarChart data={dadosAluno} className='self-end'/>
  </div>;
  const barChartMobile = 
  <div>
  <h1 className='w-[90vw] mt-5 ml-5 text-white font-spartan'>Este gráfico mostra, mês a mês, o número de inscrições na academia.</h1>
  <BarChart data={dadosAluno} mobile={true} className='self-end'/>
  </div>;
  const pieChartMobile = 
    <div>
      <h1 className='w-[90vw] mt-5 ml-5 text-white font-spartan'>Este gráfico mostra a distribuição das modalidades, pelo total de alunos inscritos.</h1>
      <PieChart data={dadosModalidade} outerRadius={110} innerRadius={0} mobile={true} className='self-end'/>
    </div>;
  const pieChart =  
  <div>
  <h1 className='mt-5 ml-5 text-white font-spartan'>Este gráfico mostra a distribuição das modalidades, pelo total de alunos inscritos.</h1>
  <PieChart data={dadosModalidade} outerRadius={220} innerRadius={0} className='self-end'/>
  </div>;
  const pieChartInadimplencia = 
  <div>
  <h1 className='mt-5 ml-5 text-white font-spartan'>Este gráfico mostra a distribuição dos alunos entre inadimplentes e em dia.</h1>
  <PieChart data={dadosInadimplencia} outerRadius={220} innerRadius={0} className='self-end'/>
  </div>;
  const pieChartInadimpleciaMobile = 
  <div>
  <h1 className='w-[90vw] mt-5 ml-5 text-white font-spartan'>Este gráfico mostra a distribuição das modalidades, pelo total de alunos inscritos.</h1>
  <PieChart2 data={dadosInadimplencia} outerRadius={110} innerRadius={0} mobile={true} className='self-end'/>
</div>;
  const pieChartMesesInadimplente = 
  <div>
  <h1 className='mt-5 ml-5 text-white font-spartan'>Este gráfico mostra, entre os alunos, a distribuição deles quanto aos meses em que cada um está inadimplente.</h1>
  <Barchart2 data={dadosMesesInadimplente} className='self-end'/>
  </div>;
  const pieChartMesesInadimplenteMobile = 
  <div>
  <h1 className='mt-5 ml-5 text-white font-spartan'>Este gráfico mostra, entre os alunos, a distribuição deles quanto aos meses em que cada um está inadimplente.</h1>
  <BarChart3 data={dadosMesesInadimplente} mobile={true} className='self-end'/>
  </div>;
  const graficos = [barChart, pieChart, pieChartInadimplencia, pieChartMesesInadimplente];
  const graficosMobile = [barChartMobile, pieChartMobile, pieChartInadimpleciaMobile, pieChartMesesInadimplenteMobile]
    
  const [indiceCorrente, configurarIndiceCorrente] = useState(0);

  const slideAnterior = (mobile) => {
    const primeiroSlide = indiceCorrente === 0;
    let novoIndice;
    if (mobile) {
      novoIndice = primeiroSlide ? graficosMobile.length - 1 : indiceCorrente - 1;
    } else {
      novoIndice = primeiroSlide ? graficos.length - 1 : indiceCorrente - 1;
    }
    configurarIndiceCorrente(novoIndice);
  }

  const proximoSlide = (mobile) => {
    let ultimoSlide;
    if (mobile) {
    ultimoSlide = indiceCorrente === graficosMobile.length - 1;
    } else {
    ultimoSlide = indiceCorrente === graficos.length - 1;
    }
    const novoIndice = ultimoSlide ? 0 : indiceCorrente + 1;
    configurarIndiceCorrente(novoIndice);
  };

  const vaiParaSlide = (indiceDoSlide) => {
    configurarIndiceCorrente(indiceDoSlide);
  }


  return (
    <div>
      {isMobile ?  (
        <div className='bg-mygray2 w-[100vw] border'>
           <div className='flex justify-center items-center w-[90vw] bg-mygray m-[0.75rem]'>
            <h1 className='p-3 font-bakbak text-4xl text-myblue'>Estatísticas</h1>
            </div>
        <div className='w-[380px] h-[600px] mt-0 mb-auto mr-auto ml-auto pt-1 pb-16 px-4 relative group'>
          {dadosAluno && dadosModalidade && dadosInadimplencia ? 
          <>
          <div className='w-full h-full rounded-2xl bg-center bg-cover duration-500 bg-slate-400 flex'>
          {graficosMobile[indiceCorrente]}
        </div>
        <div className='absolute top-[69%] -translate-x-0 translate-y-[50%] left-1 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactLeft onClick={() => slideAnterior(true)} size={30} />
        </div>
        <div className='absolute top-[69%] -translate-x-0 translate-y-[50%] right-1 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactRight onClick={() => proximoSlide(true)} size={30} />
        </div>
        <div className='flex top-4 justify-center py-2'>
            {graficosMobile.map((slide, indiceDoSlide) => (
              <div key={indiceDoSlide} onClick={() => vaiParaSlide(indiceDoSlide)}className='text-2xl cursor-pointer'>
                <RxDotFilled color={indiceCorrente === indiceDoSlide ? 'black' : 'gray'}/>
              </div>
            ))}
        </div>
        </> : null 
        }
          
        </div>
  
        </div>
      ) : (
        <div className='bg-mygray2 w-[calc(100vw-370px)] border'>
           <div className='flex justify-center items-center w-[calc(100%)-0.75rem] bg-mygray m-[0.75rem]'>
            <h1 className='p-3 font-bakbak text-4xl text-myblue'>Estatísticas</h1>
            </div>
        <div className='w-[1000px] h-[820px] mt-0 mb-auto mr-auto ml-auto pt-1 pb-16 px-4 relative group'>
          {dadosAluno && dadosModalidade && dadosInadimplencia && dadosMesesInadimplente? 
          <>
          <div className='w-full h-full rounded-2xl bg-center bg-cover duration-500 bg-slate-400 flex'>
          {graficos[indiceCorrente]}
        </div>
        <div className='absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactLeft onClick={slideAnterior} size={30} />
        </div>
        <div className='absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactRight onClick={proximoSlide} size={30} />
        </div>
        <div className='flex top-4 justify-center py-2'>
            {graficos.map((slide, indiceDoSlide) => (
              <div key={indiceDoSlide} onClick={() => vaiParaSlide(indiceDoSlide)}className='text-2xl cursor-pointer'>
                <RxDotFilled color={indiceCorrente === indiceDoSlide ? 'black' : 'gray'}/>
              </div>
            ))}
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