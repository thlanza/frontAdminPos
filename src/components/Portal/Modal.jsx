import React from 'react'
import { useEffect } from 'react';
import * as Yup from "yup";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useFormik, useField } from 'formik';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { atualizarModalidadeAction, criarModalidadeAction, resetAtualizada, resetCriada, umaModalidadeAction } from '../../redux/slices/modalidades/modalidadeSlices';
import { ToastContainer, toast } from 'react-toastify';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useState } from 'react';

const animatedComponents = makeAnimated();

const options = [
    { value: 'Segunda', label: 'Segunda' },
    { value: 'Terça', label: 'Terça' },
    { value: 'Quarta', label: 'Quarta' },
    { value: 'Quinta', label: 'Quinta' },
    { value: 'Sexta', label: 'Sexta' },
    { value: 'Sábado', label: 'Sábado' },
    { value: 'Domingo', label: 'Domingo' },
]

const formSchema = Yup.object().shape({
    nomeModalidade: Yup.string().optional().when(['horario', 'dias'], {
      is: (a, b) => a !== undefined || b !== undefined,
      then: Yup.string().required("Um dos campos deve ser preenchido")
    }),
    horario: Yup.string().optional().when(['nomeModalidade', 'dias'], {
      is: (a, b) => a !== undefined || b !== undefined,
      then: Yup.string().required("Um dos campos deve ser preenchido")
    }),
    dias: Yup.array().optional().when(['nomeModalidade', 'horario'], {
      is: (a, b) => a !== undefined || b !== undefined,
      then: Yup.array().required("Um dos campos deve ser preenchido")
    })
  }, 
    [["nomeModalidade", "horario"], ["horario", "dias"], ["nomeModalidade", "dias"]]
  );


const Modal = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const newModal = location.state?.new;
    const { id } = useParams();
    const navigate = useNavigate();
    const [pronto, configurarPronto] = useState(false);
  
    const notify = (msg) => toast.error(msg);
  
    useEffect(() => {
        if(!newModal) {
          dispatch(umaModalidadeAction(id))
          .unwrap()
          .then(() => {
            configurarPronto(true);
          });
        }
        if(newModal) {
          configurarPronto(true);
        }
        }, [dispatch, id]);


    const modalidadesList = useSelector(state => state?.modalidades, shallowEqual);
    const { modalidadeCriada, modalidadeEspecifica, modalidadeAtualizada, appErr, serverErr, loading } = modalidadesList;

    const array = 
    pronto ? 
    modalidadeEspecifica?.dias.map(element => {
        return { value: element, label: element }
      }) : [];
 
    const defaultOptions = newModal? [] : array;

    const isMobile = useMediaQuery("(max-width: 768px)");
 
          const formik = useFormik({
            enableReinitialize: true,
            initialValues: {
                nomeModalidade: newModal? '' : modalidadeEspecifica?.nomeModalidade,
                horario: newModal? '' : modalidadeEspecifica?.horario,
                dias: newModal? [] : array
            },
            onSubmit: values => {
                // configurarDias(values?.dias?.map(element => element.label));
                const data = {
                  nomeModalidade: values?.nomeModalidade,
                  horario: values?.horario,
                  dias: values?.dias ? values?.dias.map(element => element.label): defaultOptions,
                  id
                }
                if (newModal) {
                  dispatch(criarModalidadeAction(data));
                } else {
                  dispatch(atualizarModalidadeAction(data));
                }
            },
            validationSchema: formSchema
          });


          useEffect(() => {
            if(appErr || serverErr) {
                notify(`${appErr} ${serverErr}`)
                }
            }, [appErr, serverErr]);


  if (modalidadeAtualizada) {
    dispatch(resetAtualizada());
    navigate("/modalidades");
  };

  if (modalidadeCriada) {
    dispatch(resetCriada());
    navigate("/modalidades");  
  }
        
  return (
     <div className='bg-mygray2 w-screen justify-center'>
  
{isMobile ? (
  <form className='h-screen' onSubmit={formik.handleSubmit}>
    <div className='flex justify-center'>
      <p className='font-bakbak text-myblue mt-3 text-4xl pt-16'>{newModal ? 'Nova Modalidade' : 'Editar Modalidade'}</p>
    </div>
    <div className='grid grid-cols-3 mt-2'>
          <div className='pl-5 bg-myblack text-white border'>Nome da Modalidade</div>
          <input
            type="text"
            className="nome-modalidade col-span-2 border border-gray-700 p-3 rounded mb-1 ml-5 w-[85%] flex justify-center items-center"
            value={formik.values.nomeModalidade}
            onChange={formik.handleChange("nomeModalidade")}
            onBlur={formik.handleBlur("nomeModalidade")}
            placeholder="nome da modalidade"
          />
      </div>
      <div className='grid grid-cols-3'>
          <div className='pl-5 bg-myblack text-white border'>Horários</div>
          <input
              type="time"
              step="60"
              min="00:00"
              max="23:59"
              patern="[0-9]{2}:[0-9]{2}"
              value={formik.values.horario}
              onChange={formik.handleChange("horario")}
              onBlur={formik.handleBlur("horario")}
              className="horario col-span-2 border border-gray-700 p-3 rounded ml-5 mb-1 w-[85%]"
              placeholder="Horário"
            />
      </div>
      <div className='grid grid-cols-3'>       
          <>
          <div className='pl-5 bg-myblack text-white border'>Dias</div>
              <Select 
    className='p-3 mb-1 col-span-2'
    placeholder="Selecione..."
    components={animatedComponents}
    onChange={(opcao) => formik.setFieldValue("dias", opcao)}
    options={options}
    defaultValue={pronto ? defaultOptions : []}
    isMulti
    isSearchable
    />
    </>


      </div>
      <div className='bg-mygray flex items-center justify-center pb-3 pt-3 '>
          <button 
          type="submit"
          className='pt-2 pb-2 pl-3 pr-3 bg-myblue text-white rounded-lg 
          font-spartan border-2 border-white hover:bg-blue-300 transition 
          duration-500'>
              {newModal ? 'Nova' : 'Editar'}
          </button>
      </div>
      <ToastContainer />
  </form>
): (
      <>
      <div className='flex justify-center'>
      <p className='font-bakbak text-myblue mt-3 text-4xl'>{newModal ? 'Nova Modalidade' : 'Editar Modalidade'}</p>
    </div>
    <form onSubmit={formik.handleSubmit} className='flex flex-col items-center w-[15%] ml-[350px]'>
    <div className='bg-mygray mt-8 w-[800px] flex flex-col font-spartan'>
    <div>
    <p className='flex justify-center text-2xl mb-1 bg-myblack text-white'>Nome da Modalidade</p>
    <input
    type="text"
    className="nome-modalidade border border-gray-700 p-3 rounded mb-1 ml-5 w-[85%] flex justify-center items-center"
    value={formik.values.nomeModalidade}
    onChange={formik.handleChange("nomeModalidade")}
    onBlur={formik.handleBlur("nomeModalidade")}
    placeholder="nome da modalidade"
    />
    </div>
    <div>
    <p className='flex justify-center text-2xl mb-1 bg-myblack text-white'>Horários</p>
    <input
    type="time"
    step="60"
    min="00:00"
    max="23:59"
    patern="[0-9]{2}:[0-9]{2}"
    value={formik.values.horario}
    onChange={formik.handleChange("horario")}
    onBlur={formik.handleBlur("horario")}
    className="horario border border-gray-700 p-3 rounded ml-5 mb-1 w-[85%]"
    placeholder="Horário"
    />
    </div>
    <div>

   {pronto ? (
    <>
   <p className='flex justify-center text-2xl bg-myblack text-white'>Dias</p>    
   <Select 
   className='p-3 mb-1 select'
   placeholder="Selecione..."
   components={animatedComponents}
   onChange={(e) => {
     formik.setFieldValue("dias", e)
   }}
   defaultValue={defaultOptions}
   options={options}
   isMulti
   isSearchable
   />  
   </>) : null}
              
    </div>


    </div>

      <div className='bg-mygray w-[800px] flex items-center justify-center pb-3'>
          <button 
          type="submit"
          className='pt-2 pb-2 pl-3 pr-3 bg-myblue text-white rounded-lg 
          font-spartan border-2 border-white hover:bg-blue-300 transition 
          duration-500'>
              {newModal ? 'Nova' : 'Editar'}
          </button>
      </div>
      <ToastContainer />
    </form>
    </>
)}
        
    </div>
  )
}

export default Modal