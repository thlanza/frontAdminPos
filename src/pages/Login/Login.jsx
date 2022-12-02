import React, { useEffect } from 'react'
import useMediaQuery from '../../hooks/useMediaQuery'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Logo from '../../components/Logo/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/slices/admin/adminSlices';
import { ToastContainer, toast } from 'react-toastify';

const formSchema = Yup.object({
  email: Yup.string().email("Deve ser um email válido.").required("Email é requerido."),
  senha: Yup.string().required("Senha é requerida."),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = (msg) => toast.error(msg);

  const formik = useFormik({
    initialValues: {
        email: "",
        senha: ""
    },
    onSubmit: values => {
        dispatch(loginAction(values));
    },
    validationSchema: formSchema
  });

  const store = useSelector((state) => state?.admin);
  const { usuarioLogado, loading, appErr, serverErr } = store;

  useEffect(() => {
    if(appErr || serverErr) {
        notify(`${appErr} ${serverErr}`)
        }
    }, [appErr, serverErr]);

  if (usuarioLogado) {
    navigate("/home")
  }

  const renderButton = () => {
    if (loading) {
        return (
                    <button 
                    disabled 
                    className='bg-gray-500 text-white rounded-lg p-3 w-full 
                    mt-12'>
                        Logar
                </button>
                )
    } else {
        return (
                    <button 
                        type='submit' 
                        className='bg-myblue text-white rounded-lg p-3 w-full 
                        mt-12 hover:bg-blue-700'>
                        Logar
                    </button>
                )
  }
}

  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className='flex flex-col sm:flex-row relative'>
        {isMobile ? (
           <>
          <Logo mobile={true}/>
           <p className='text-center mt-10 mb-5 text-4xl font-spartan'>Bem-vindo!</p>
          
               <form 
                onSubmit={formik.handleSubmit}
                className='p-5'>
               <p className='font-bakbak text-left font-bold'>Email</p>
                <input 
                            value={formik.values.email}
                            onChange={formik.handleChange("email")}
                            onBlur={formik.handleBlur("email")}
                            type="email" 
                            className="relative border-4 p-3 w-full rounded-lg placeholder:p-4" 
                            placeholder='Coloque aqui seu email'
                        />
       
                <p className='font-bakbak text-left font-bold'>Senha</p>
                    <input 
                        type="password"  
                        value={formik.values.senha}  
                        onChange={formik.handleChange("senha")}
                        onBlur={formik.handleBlur("senha")}
                        className="border-4 p-3 w-full rounded-lg placeholder:p-4" 
                        placeholder='Coloque aqui seu email'
                    />
                <ToastContainer />
                {renderButton(loading)}
                <p className='mt-7 font-light'>É o seu primeiro acesso? <button 
                  onClick={() => navigate('/primeiroLogin')} 
                  className='font-bold cursor-pointer'>
                      Cadastrar
                  </button></p>
               </form>
        </>
        ) : 
        (
          <>
    
          <div className='w-1/2'>
          <Logo />
    
          <p className='font-spartan p-5 text-center text-5xl mt-10'>Bem-vindo ao Painel Admin da Academia Lanza!</p>
          <form onSubmit={formik.handleSubmit} className='p-5 mt-5'>
              <p className='font-bakbak text-left font-bold flex justify-between'><span>Email</span> 
              <span className='font-spartan text-red-500'>{formik?.touched?.email && formik?.errors?.email}</span></p>
              <input 
                  type="email" 
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  className="border p-3 w-full rounded-lg" 
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
                  className="border p-3 w-full rounded-lg" 
                  placeholder='Coloque aqui seu email'
              />
              {renderButton(loading)}
  
              <p className='mt-16 font-light'>É o seu primeiro acesso? 
                  <button 
                  onClick={() => navigate('/primeiroLogin')} 
                  className='font-bold cursor-pointer'>
                      Cadastrar
                  </button>
              </p>
          </form>
          
          </div>
          <div className='w-1/2 h-screen'>
              <img className="h-screen w-[100%] object-cover object-top" src="./gym.jpg" alt="" />
          </div>
      </>
        )}
    </div>
  )
}

export default Login