import React from 'react';

function Form({ formularioRegistro, formData, handleInputChange, handleSubmit, setFormularioRegistro  }) {
  return (
    <div className='contenedor-formulario'>
      <form onSubmit={handleSubmit}>
        <h2>{formularioRegistro ? 'Registro' : 'Login'}</h2>
        {formularioRegistro && <input type="text" placeholder='USUARIO' name='usuario' value={formData.usuario} onChange={handleInputChange} required />}
        <input type="email" placeholder='EMAIL' name='email' value={formData.email} onChange={handleInputChange} required />
        <input type="password" placeholder='CONTRASEÑA' name='password' value={formData.password} onChange={handleInputChange} required />
        <button className='btn-registrar'>{formularioRegistro ? 'Registrar' : 'Ingresar'}</button>
        <a href="#" className='ya-tengo-cuenta' onClick={() => {setFormularioRegistro(!formularioRegistro);formData.email='';formData.password='';formData.usuario=''}}>{formularioRegistro? 'Ya tengo cuenta':'Registrate'}</a>
      </form>
    </div>
  );
}

export default Form;
