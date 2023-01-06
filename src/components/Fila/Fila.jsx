import React from 'react'

const Fila = ({ rotulo, conteudo }) => {
  return (
    <p className='flex flex-col'><span className='bg-myblack text-white flex-1'>{rotulo}</span><span className='flex-1'>{conteudo}</span></p>
  )
}

export default Fila