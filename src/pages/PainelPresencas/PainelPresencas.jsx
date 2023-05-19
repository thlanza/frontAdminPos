import React, { useState } from 'react'
import useMediaQuery from '../../hooks/useMediaQuery';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt-BR';
import { getModalidadesAction } from '../../redux/slices/modalidades/modalidadeSlices';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom';
import { painelPresencaAction } from '../../redux/slices/admin/adminSlices';
registerLocale('pt', pt);



const PainelPresencas = () => {
  const dispatch = useDispatch();
  const mensagem = "Estamos com problemas nos servidores. Tente novamente mais tarde."
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [msgErro, configurarMsgErro] = useState("");
  const [dataInicial, configurarDataInicial] = useState(new Date());


  useEffect(() => {
    dispatch(getModalidadesAction())
  }, [dispatch]);

  const { loading, modalidades, appErr, serverErr } = useSelector(state => state?.modalidades);

  const [modalidadeSelecionada, configurarModalidadeSelecionada] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = new Date(dataInicial);
    let mes = data.getMonth() + 1 < 10 ? `0${data.getMonth() + 1}` : data.getMonth() + 1;
    let ano = data.getFullYear();
    let dia = data.getDate() < 10 ? `0${data.getDate()}` : data.getDate();

    let modalidadeId = modalidadeSelecionada;

    let requisicao = {
      modalidadeId,
      mes,
      ano,
      dia
    }
    if (modalidadeSelecionada === "") {
      alert("Selecione uma modalidade!");
      return;
    }
    const listaDePresenca = await dispatch(painelPresencaAction(requisicao));
    if (listaDePresenca.error || !mes || !ano || !dia || !modalidadeId){
      configurarMsgErro(listaDePresenca.payload.message);
      return;
    }
    
    navigate('/painelPresencasLista', {
      state: listaDePresenca.payload
    })
  }

  // const admin = useSelector(state => state?.admin);
  // const { listaDePresenca } = admin;

  return (
    <div className='bg-mygray2'>
    {isMobile ? (
        <div className='bg-mygray2 h-[100vh] w-[100vw] border flex flex-col'>
            <div className='flex justify-center items-center bg-mygray m-[0.75rem] flex-col'>
            <h1 className='p-3 font-bakbak text-4xl text-myblue'>Painel de Presenças</h1>
            </div>
            <div>
            <div className='flex justify-center items-center bg-mygray m-[0.75rem] flex-col'>
            {
              appErr || serverErr || msgErro ? <h1 className='p-3 font-spartan text-2xl text-red-600'>{mensagem}</h1> :
              <h1 className='p-3 font-spartan text-2xl text-myblue'>Escolha a data e a modalidade para consultar as presenças:</h1>
            }
            </div>
            

            <div className='flex justify-start items-center w-[calc(100%)-0.75rem] h-[calc(100vh-300px)] bg-mygray m-[0.75rem] flex-col'>
            <form className='mt-10 mb-3 ml-5 font-spartan' onSubmit={(e) => onSubmit(e)}>
                    <label className='text-myblue font-spartan p-2 border border-black bg-white' htmlFor="modalidade">Escolha uma modalidade:</label>
                    <br /><br />
                   {loading ? 
                      <ClipLoader
                      color={"red"}
                      size={150}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                   : 
                   (
                    <select onChange={(e) => configurarModalidadeSelecionada(e.target.value)}  className='border border-black p-2 text-myblue' name="modalidade" id="modalidade">
                    <option disabled selected value> -- Selecione uma opção -- </option>
                    {modalidades?.map(modalidade => {
                        return (
                        <option value={modalidade._id}>{modalidade.nomeModalidade}</option>
                        )
                    }
                    )}
                </select>
                   )}
                    <br /><br />
                    <DatePicker 
                        selected={dataInicial} 
                        className='mb-5 text-myblue border border-black'
                        onChange={(date) => configurarDataInicial(date)} 
                        locale='pt'
                    />
                    <button className='text-black bg-white rounded-full p-3 transition duration-500 hover:bg-black hover:text-white border border-black' type="submit">Consultar</button>
            </form>
            </div>
            </div>

            </div>
    ) : (
        <div className='bg-mygray2 w-[calc(100vw-350px)] h-[calc(100vh-50px)] border flex flex-col'>
            <div className='flex justify-center items-center w-[calc(100%)-0.75rem] bg-mygray m-[0.75rem] flex-col'>
            <h1 className='p-3 font-bakbak text-4xl text-myblue'>Painel de Presenças</h1>
            </div>
            <div>
            <div className='flex justify-center items-center w-[calc(100%)-0.75rem] bg-mygray m-[0.75rem] flex-col'>
            {
              appErr || serverErr || msgErro ? <h1 className='p-3 font-spartan text-2xl text-red-600'>{mensagem}</h1> :
              <h1 className='p-3 font-spartan text-2xl text-myblue'>Escolha a data e a modalidade para consultar as presenças:</h1>
            }
            </div>
            

            <div className='flex justify-start items-center w-[calc(100%)-0.75rem] h-[calc(100vh-185px)] bg-mygray m-[0.75rem] flex-col'>
            <form className='mt-10 mb-3 ml-5 font-spartan' onSubmit={(e) => onSubmit(e)}>
                    <label className='text-myblue font-spartan p-2 border border-black bg-white' htmlFor="modalidade">Escolha uma modalidade:</label>
                    <br /><br />
                   {loading ? 
                      <ClipLoader
                      color={"red"}
                      size={150}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                   : 
                   (
                    <select onChange={(e) => configurarModalidadeSelecionada(e.target.value)}  className='border border-black p-2 text-myblue' name="modalidade" id="modalidade">
                    <option disabled selected value> -- Selecione uma opção -- </option>
                    {modalidades?.map(modalidade => {
                        return (
                        <option value={modalidade._id}>{modalidade.nomeModalidade}</option>
                        )
                    }
                    )}
                </select>
                   )}
                    <br /><br />
                    <DatePicker 
                        selected={dataInicial} 
                        className='mb-5 text-myblue border border-black'
                        onChange={(date) => configurarDataInicial(date)} 
                        locale='pt'
                    />
                    <button className='text-black bg-white rounded-full p-3 transition duration-500 hover:bg-black hover:text-white border border-black' type="submit">Consultar</button>
            </form>
            </div>
            </div>

            </div>
    )}
    </div>
  )
}

export default PainelPresencas