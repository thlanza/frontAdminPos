import React from 'react'
import { ImArrowRight } from "react-icons/im";

const Home = () => {
  return (
    <div className='border w-screen bg-mygray2'>
      <div className='bem-vindo flex justify-center items-center w-[calc(100%)-0.75rem] bg-mygray m-[0.75rem]'>
      <h1 className='p-3 font-bakbak text-4xl text-myblue'>BEM-VINDO(A) À ACADEMIA LANZA!</h1>
      </div>
      <div className='flex justify-start items-center w-[calc(100%)-0.75rem] bg-mygray m-[0.75rem]'>
        <p className='p-3 font-spartan text-5xl text-myblue bg-mygray'>Estatísticas principais:</p>
      </div>
      <div className='flex justify-start items-center w-[calc(100%)-0.75rem] bg-mygray m-[0.75rem]'>
        <ImArrowRight 
          size={40} 
          color={"#315199"} 
          className="ml-5"
        />
        <p className='p-3 font-spartan text-4xl text-myblue bg-mygray'>Número de alunos: 320</p>
      </div>
      <div className='flex justify-start items-center w-[calc(100%)-0.75rem] bg-mygray m-[0.75rem]'>
      <ImArrowRight 
          size={40} 
          color={"#315199"} 
          className="ml-5"
        />
        <p className='p-3 font-spartan text-4xl text-myblue bg-mygray'>Índice de Inadimplência: 20%</p>
      </div>
      <div className='flex justify-start items-center w-[calc(100%)-0.75rem] bg-mygray m-[0.75rem]'>
        <p className='p-3 font-spartan text-4xl text-myblue bg-mygray'>Para estatísticas mais aprofundadas, clique no link "Estatísticas"!</p>
      </div>

      </div>
  )
}

export default Home