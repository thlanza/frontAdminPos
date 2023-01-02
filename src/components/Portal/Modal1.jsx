import React from 'react'
import { useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai'
import * as Yup from "yup";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { atualizarModalidadeAction, umaModalidadeAction } from '../../redux/slices/modalidades/modalidadeSlices';
import { ToastContainer, toast } from 'react-toastify';


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

const Modal = ({ visivel, fechar, id }) => {
    
  const handleFechar = (e) => {
   if(e.target.id === "container") fechar(); 
  }

  const dispatch = useDispatch();

  const notify = (msg) => toast.error(msg);

  const modalidadesList = useSelector(state => state?.modalidades);
  const { modalidadeAtualizada, modalidadeEspecifica, appErr, serverErr, loading } = modalidadesList;
  

  const array = modalidadeEspecifica?.dias.map(element => {
    return { value: element, label: element }
  })

  const defaultOptions = array;

  useEffect(() => {
    const keyDownHandler = event => {
  
      if (event.key === 'Escape') {
        event.preventDefault();
        handleFechar();     
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    // 👇️ clean up event listener
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  useEffect(() => {
    if(appErr || serverErr) {
        notify(`${appErr} ${serverErr}`)
        }
    }, [appErr, serverErr]);

    useEffect(() => {
      dispatch(umaModalidadeAction(id))
      }, []);

      const formik = useFormik({
        initialValues: {
            nomeModalidade: modalidadeEspecifica?.nomeModalidade,
            horario: modalidadeEspecifica?.horario,
            dias: modalidadeEspecifica?.dias
        },
        onSubmit: values => {
            const data = {
              nomeModalidade: values?.nomeModalidade,
              horario: values?.horario,
              dias: values?.dias?.map(element => element.label),
              id
            }
            dispatch(atualizarModalidadeAction(data));
        },
        validationSchema: formSchema
      });

  if (!visivel) return null;

  return (
    <div 
    onClick={handleFechar}
    id="container"
    className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex 
    items-center justify-center font-spartan">
    <div className="bg-white p-2 rounded w-72">
       <div className='flex justify-between items-center'>
       <h1 className="ml-6 font-semibold text-center text-xl text-gray-700">
        Editar Modalidades
      </h1>
      <div className='cursor-pointer' onClick={fechar}><AiFillCloseCircle /></div>
       </div>
     
      <p className="text-center text-gray-700 mb-5">Preencha o formulário com o que você quer alterar</p>

      <form onSubmit={formik.handleSubmit} className="flex flex-col p-5">
        <label>Nome da Modalidade</label>
        <input
          type="text"
          className="border border-gray-700 p-2 rounded mb-5"
          value={formik.values.nomeModalidade}
          onChange={formik.handleChange("nomeModalidade")}
          onBlur={formik.handleBlur("nomeModalidade")}
          placeholder="nome da modalidade"
        />
        <label>Horário</label>
        <input
          type="time"
          step="60"
          min="00:00"
          max="23:59"
          patern="[0-9]{2}:[0-9]{2}"
          value={formik.values.horario}
          onChange={formik.handleChange("horario")}
          onBlur={formik.handleBlur("horario")}
          className="border border-gray-700 p-2 rounded mb-5"
          placeholder="Horário"
        />
        <label>Dias</label>
        <Select 
        components={animatedComponents}
        onChange={(item => formik.setFieldValue('dias', item))}
        options={options}
        defaultValue={defaultOptions}
        isMulti
        isSearchable
        />
      <div className="text-center mt-5">
        <button type="submit" className="px-5 py-2 bg-gray-700 text-white rounded">
          Sign in
        </button>
      </div>
      </form>
     <ToastContainer />
    </div>
  </div>
  )
}

export default Modal