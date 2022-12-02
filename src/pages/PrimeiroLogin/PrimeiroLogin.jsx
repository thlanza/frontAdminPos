import { useFormik } from 'formik';
import useMediaQuery from '../../hooks/useMediaQuery';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { primeiroLoginAction } from '../../redux/slices/admin/adminSlices';
import Logo from '../../components/Logo/Logo';

const formSchema = Yup.object({
    email: Yup.string().email("Deve ser um email válido.").required("Email é requerido."),
    senha: Yup.string().required("Senha é requerida."),
});

const PrimeiroLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = (msg) => toast.error(msg);
  const admin = useSelector(state => state?.admin);
  const { primeiroLogin, appErr, serverErr, loading } = admin;
  const formik = useFormik({
    initialValues: {
        email: '',
        senha: ''
    },
    onSubmit: values => {
        dispatch(primeiroLoginAction(values));
    },
    validationSchema: formSchema
  });

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if(appErr || serverErr) {
        notify(`${appErr} ${serverErr}`)
        }
    }, [appErr, serverErr]);

    if(primeiroLogin) {
        return navigate("/registrar")
      };
   

  return (
    <div className='flex flex-col sm:flex-row relative'>
    {isMobile ? 
    (
       <>
    <Logo mobile={true}/>
    <p className='text-center mt-10 mb-10 text-5xl font-spartan'>Logue com a senha que lhe foi fornecida.</p>
   
        <form onSubmit={formik.handleSubmit} className='p-5'>
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
            <p className='font-bakbak text-left font-bold flex justify-between'><span>Senha</span>
                <span className='font-spartan text-red-500'>{formik?.touched?.senha && formik?.errors?.senha}</span>
            </p>
            <ToastContainer />
             <input 
                 type="password"  
                 value={formik.values.senha}
                 onChange={formik.handleChange("senha")}
                 onBlur={formik.handleBlur("senha")}
                 className="border-4 p-3 pl-8 w-full rounded-lg" 
                 placeholder='Coloque aqui seu email'
             />
             {loading ? (
                <button 
                disabled
                className='bg-gray-400 text-white rounded-lg p-3 w-full mt-12'>
                Carregando
                </button>
             ) : (
                <button 
                    type="submit"
                    className='bg-myblue text-white rounded-lg p-3 w-full mt-12 hover:bg-blue-700'>
                    Logar
                </button>
             )}
           
        </form>
 </>
    ) : 
    (
      <>
    <div className='w-1/2'>
        <Logo />
        <p className='font-spartan p-5 text-center text-5xl mt-10'>Logue com a senha que lhe foi fornecida.</p>
        <form onSubmit={formik.handleSubmit} className='p-5 mt-5'>
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
            <p className='font-bakbak text-left font-bold flex justify-between'><span>Senha</span>
                <span className='font-spartan text-red-500'>{formik?.touched?.senha && formik?.errors?.senha}</span>
            </p>
            <input 
                value={formik.values.senha}
                onChange={formik.handleChange("senha")}
                onBlur={formik.handleBlur("senha")}
                type="password"  
                className="border p-3 w-full rounded-lg" 
                placeholder='Coloque aqui seu email'
            />
            {loading ? (
                <button 
                disabled
                className='bg-gray-400 text-white rounded-lg p-3 w-full mt-12 hover:bg-blue-700'>
                Carregando...
                </button>
            ) : (
                <button 
                type='submit' 
                className='bg-myblue text-white rounded-lg p-3 w-full mt-12 hover:bg-blue-700'>
                Logar
            </button>
            )}
         
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

export default PrimeiroLogin