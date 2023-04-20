import React from 'react'
import BarChart from '../../components/BarChart/BarChart';
import axios from 'axios';
import { baseUrl } from '../../utils/baseURL';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useState } from 'react';
import { useEffect } from 'react';

const Estatisticas = () => {
  const [dados, configurarDados] = useState(null);

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    axios.get(
      `${baseUrl}/estatisticas/dadosParaGraficoAlunosInscricao`
    ).then(resposta => configurarDados(resposta.data))
    .catch(err => console.error(err));
  }, []);


    

  return (
    <div>
      {isMobile ? <div>TODO</div> : (
        <div>
                <p>Gráficos</p>
                {dados ? <BarChart data={dados} /> : null}         
        </div>
      )} 
    </div>
  )
}

export default Estatisticas