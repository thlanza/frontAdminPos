import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import Logo from '../../components/Logo/Logo';
import * as Yup from 'yup';
import useMediaQuery from '../../hooks/useMediaQuery';
import styled from 'styled-components';
import { registrarUsuarioAction } from '../../redux/slices/admin/adminSlices';

const formSchema = Yup.object({
    primeiroNome: Yup.string().required("Primeiro nome é requerido."),
    sobrenome: Yup.string().required("Sobrenome é requerido."),
    email: Yup.string().required("Email é requerido."),
    senha: Yup.string().required("Senha é requerida."),
    image: Yup.string().required("Imagem é requerida.")
});

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  border-color: 'red';
  transition: border 0.24s ease-in-out;
`;

const Registrar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
        primeiroNome: '',
        sobrenome: '',
        senha: '',
        email: '',
        image: ''
    },
    onSubmit: values => {
        dispatch(registrarUsuarioAction(values));
    },
    validationSchema: formSchema
  });

  //redirecionar
  const store = useSelector(state => state.admin);
  const { loading, appErr, serverErr, usuarioLogado } = store;

  if (usuarioLogado) navigate('/home');

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className='flex flex-col sm:flex-row relative'>
    {isMobile ? 
    (
       <>
    <Logo />
    <p className='text-center mt-8 mb-8 text-5xl font-spartan'>Preencha seus dados para registrar-se.</p>
   
        <form onSubmit={formik.handleSubmit} className='pt-1 p-5'>
            <p className='font-bakbak text-left font-bold flex justify-between'><span>Primeiro Nome</span> 
                <span className='font-spartan text-red-500'>{formik?.touched?.primeiroNome && formik?.errors?.primeiroNome}</span>
             </p>
             <input 
                     type="text" 
                     value={formik.values.primeiroNome}
                     onChange={formik.handleChange("primeiroNome")}
                     onBlur={formik.handleBlur("primeiroNome")}
                     className="relative border-4 p-3 pl-8 w-full rounded-lg" 
                     placeholder='Coloque aqui seu primeiro nome'
                 />
            <p className='font-bakbak text-left font-bold flex justify-between'><span>Sobrenome</span> 
                <span className='font-spartan text-red-500'>{formik?.touched?.sobrenome && formik?.errors?.sobrenome}</span>
             </p>
             <input 
                     type="text" 
                     value={formik.values.sobrenome}
                     onChange={formik.handleChange("sobrenome")}
                     onBlur={formik.handleBlur("sobrenome")}
                     className="relative border-4 p-3 pl-8 w-full rounded-lg" 
                     placeholder='Coloque aqui seu sobrenome'
                 />
            <p className='font-bakbak text-left font-bold flex justify-between'><span>Senha</span>
                <span className='font-spartan text-red-500'>{formik?.touched?.senha && formik?.errors?.senha}</span>
            </p>
             <input 
                 type="password"  
                 value={formik.values.senha}
                 onChange={formik.handleChange("senha")}
                 onBlur={formik.handleBlur("senha")}
                 className="border-4 p-3 pl-8 w-full rounded-lg" 
                 placeholder='Coloque aqui sua senha'
             />
               <p className='font-bakbak text-left font-bold flex justify-between'><span>Email</span> 
                <span className='font-spartan text-red-500'>{formik?.touched?.email && formik?.errors?.email}</span>
             </p>
             <input 
                     type="text" 
                     value={formik.values.email}
                     onChange={formik.handleChange("email")}
                     onBlur={formik.handleBlur("email")}
                     className="relative border-4 p-3 pl-8 w-full rounded-lg" 
                     placeholder='Coloque aqui seu email'
                 />
                    <Container>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(event) => {
                formik.setFieldValue('image', event.currentTarget.files[0])
              }}
            />
            </Container>
            <button 
                type="submit"
                className='bg-myblue text-white rounded-lg p-3 w-full mt-12 hover:bg-blue-700'>
                 Logar
            </button>
        </form>
 </>
    ) : 
    (
      <>
    <div className='w-1/2'>
        <Logo />
        <p className='font-spartan p-5 text-center text-5xl mt-5'>Preencha seus dados para registrar-se.</p>
        <form onSubmit={formik.handleSubmit} className='p-5 mt-1'>
        <p className='font-bakbak text-left font-bold flex justify-between'><span>Primeiro Nome</span> 
            <span className='font-spartan text-red-500'>{formik?.touched?.primeiroNome && formik?.errors?.primeiroNome}</span>
        </p>
            <input 
                value={formik.values.primeiroNome}
                onChange={formik.handleChange("primeiroNome")}
                onBlur={formik.handleBlur("primeiroNome")}
                type="text" 
                className="border p-3 w-full rounded-lg" 
                placeholder='Coloque aqui seu primeiro nome'
            />
            <p className='font-bakbak text-left font-bold flex justify-between'><span>Sobrenome</span>
                <span className='font-spartan text-red-500'>{formik?.touched?.sobrenome && formik?.errors?.sobrenome}</span>
            </p>
            <input 
                value={formik.values.sobrenome}
                onChange={formik.handleChange("sobrenome")}
                onBlur={formik.handleBlur("sobrenome")}
                type="text" 
                className="border p-3 w-full rounded-lg" 
                placeholder='Coloque aqui seu sobrenome'
            />
            <p className='font-bakbak text-left font-bold flex justify-between'><span>Senha</span>
                <span className='font-spartan text-red-500'>{formik?.touched?.senha && formik?.errors?.senha}</span>
            </p>
            <input 
                value={formik.values.senha}
                onChange={formik.handleChange("senha")}
                onBlur={formik.handleBlur("senha")}
                type="password" 
                className="border p-3 w-full rounded-lg" 
                placeholder='Coloque aqui sua senha'
            />
            <p className='font-bakbak text-left font-bold flex justify-between'><span>Email</span>
                <span className='font-spartan text-red-500'>{formik?.touched?.email && formik?.errors?.email}</span>
            </p>
            <input 
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                type="text"  
                className="border p-3 w-full rounded-lg" 
                placeholder='Coloque aqui seu email'
            />
            <Container>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(event) => {
                formik.setFieldValue('image', event.currentTarget.files[0])
              }}
            />
            </Container>
            <button 
                type='submit' 
                className='bg-myblue text-white rounded-lg p-3 w-full mt-12 hover:bg-blue-700'>
                Logar
            </button>
    </form>
    </div>
        <div className='w-1/2 h-screen'>
        <img className="h-screen w-[100%] object-cover object-top" src="./gym.jpg" alt="" />
    </div>
    <ToastContainer />
    </>
    )}
    </div>
  )
}

export default Registrar