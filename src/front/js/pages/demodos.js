import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Demodos = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userCreated, setUserCreated] = useState(false); // Variable de estado para controlar si se creó el usuario
  const [headerText, setHeaderText] = useState('CREATE USER'); // Variable de estado para controlar el texto del encabezado
  const { actions, store } = useContext(Context);

  function sendData(e) {
    e.preventDefault();
    console.log('send Data');
    console.log(email, password);
    actions.create(email, password);
    setUserCreated(true); // Actualizar la variable de estado después de crear el usuario
    setHeaderText('USUARIO CREADO'); // Cambiar el texto del encabezado
  }

  function resetForm() {
    setEmail('');
    setPassword('');
    setUserCreated(false);
    setHeaderText('CREATE USER'); // Restablecer el texto del encabezado
  }

  return (
    <>
      {store.auth ? (
        <Navigate to="/demodos" /> 
      ) : (
        <>
          <form className="row g-3" onSubmit={sendData}>
            <h1>{headerText}</h1> {/* Mostrar el texto del encabezado */}
            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="inputEmail4" />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="inputPassword4" />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-warning">Sign UP</button>
            </div>
          </form>
          {userCreated && (
            <button type="button" className="btn btn-primary" onClick={resetForm}>
              Crear otro usuario
            </button>
          )} {/* Botón para crear otro usuario después de que se crea uno */}
            <Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
        </>
      )}
    
    </>
  );
};

export default Demodos;
