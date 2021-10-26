import { nanoid } from 'nanoid';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Tooltip } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_URL = "https://backend-ventrack.herokuapp.com";

const  Usuarios = () => {
  const [mostrarLista, setMostrarLista] = useState(true);
  const [Usuarios, setUsuarios] = useState([]);
  const [textoBoton, setTextoBoton] = useState("Registar nuevo Usuario");
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

  const obtenerUsuarios = async () => {
    const options = {
      method: 'GET',
      url: `${BACKEND_URL}/api/usuario`,
      headers: {'Content-Type': 'application/json'}
    };
     
    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setUsuarios(response.data.usuarios);
        })
      .catch(function (error) {
        console.error(error);
      });
    setEjecutarConsulta();
  };

  useEffect(() => {
    console.log("Consulta", ejecutarConsulta);
    if(ejecutarConsulta){
      obtenerUsuarios();
    }
  }, [ejecutarConsulta])
    

  useEffect(() => {
    //Obtener lista de productos desde el backend
    if(mostrarLista){
      setEjecutarConsulta(true);
    }
  }, [mostrarLista]);

  useEffect(() => {
    if(mostrarLista){
      setTextoBoton("Registrar nuevo Usuario");
    }
    else{
      setTextoBoton("Volver a la lista");
    }
  }, [mostrarLista]);

  return (
    <div>
      <button onClick={() => {setMostrarLista(!mostrarLista)}} className="absolute my-10 mx-5 bg-blanco 
      text-white ">{textoBoton}</button>
      {mostrarLista ? (
      <ListaUsuarios tablaUsuarios={Usuarios} setEjecutarConsulta={setEjecutarConsulta} />
      ) : (
      <RegistroUsuarios 
      setMostrarLista = {setMostrarLista}
      tablaUsuarios = {Usuarios}
      setUsuarios = {setUsuarios}/>
      )}
      <ToastContainer position="bottom-center" autoClose={4000} />
    </div>
  );
};


const ListaUsuarios = ({tablaUsuarios, setEjecutarConsulta}) => {

  const [busqueda, setBusqueda] = useState('');
  const [UsuariosFiltrados, setUsuariosFiltrados] = useState(tablaUsuarios);

  useEffect(() => {
    setUsuariosFiltrados(
      tablaUsuarios.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, tablaUsuarios]);

  return(
    <div className="flex flex-col items-center">
      <input 
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar" 
        className="border-2 border-gray-500 my-10 px-3 py-2 focus:outline-none focus:border-indigo-500" />
      <h2 className="text-4xl font-serif my-5">Usuarios Registrados</h2> 
        <table className="w-full tabla border-separate">
          <thead>
            <tr>
              <th className="border border-gray-400 text-gray-800 bg-gray-300">ID</th>
              <th className="border border-gray-400 text-gray-800 bg-gray-300">Base de Datos</th>
              <th className="border border-gray-400 text-gray-800 bg-gray-300">Correo</th>
              <th className="border border-gray-400 text-gray-800 bg-gray-300">Rol</th>
              <th className="border border-gray-400 text-gray-800 bg-gray-300"  >Actualizar</th>
            </tr>
          </thead>
          <tbody className="border border-gray-400 text-gray-800 bg-gray-200">
            {UsuariosFiltrados.map((usuarios) => {
              return <FilaUsuarios key={nanoid()} 
              usuarios={usuarios} 
              setEjecutarConsulta={setEjecutarConsulta} />;
            })}
          </tbody>
        </table>
        <Link to="/dashboard">
          <button className="bg-indigo-500 my-10
             text-white rounded border p-4  hover:bg-blue-400">Página principal</button>
        </Link>
    </div>
  );
};

const FilaUsuarios = ({usuarios, setEjecutarConsulta}) => {
  console.log("Usuarios", usuarios);

  const [editar, setEditar] = useState(false);
  const [infoNuevoUsuarios, setInfoNuevoUsuarios] = useState({
    _id : usuarios._id,
    connection : usuarios.connection,
    description : usuarios.description,
    rol : usuarios.rol
  })

  const actualizarUsuarios = async () => {
    console.log(infoNuevoUsuarios);
    //Enviar información al backend
    const options = {
      method: 'PATCH',
      url: `${BACKEND_URL}/api/usuario`,
      headers: {'Content-Type': 'application/json'},
      data: {...infoNuevoUsuarios, _id: usuarios._id},
    };
    
    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Usuario modificado con éxito");
        setEditar(false);
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        toast.error("Error modificado el usuario");
        console.error(error);
      });
  };

  return (
        <tr>
          {editar? (
            <>
              <td>
               
                 <span>{infoNuevoUsuarios._id}</span>
              </td>
              <td>
                <input className=' bg-gray-50 border rounded border-gray-400 p-1 m-2'
                 type="text" value={infoNuevoUsuarios.connection}
                 onChange={(e) => setInfoNuevoUsuarios({...infoNuevoUsuarios, connection: e.target.value})} />
                </td>
              <td>
                <input className=' bg-gray-50 border rounded border-gray-400 p-1 m-2'
                 type="text" value={infoNuevoUsuarios.description}
                 onChange={(e) => setInfoNuevoUsuarios({...infoNuevoUsuarios, email: e.target.value})} />
              </td>
              <td>
                <input className=' bg-gray-50 border rounded border-gray-400 p-1 m-2'
                 type="text" value={infoNuevoUsuarios.rol}
                 onChange={(e) => setInfoNuevoUsuarios({...infoNuevoUsuarios, rol: e.target.value})} />
              </td>
            </>
          ) : (
            <>
              <td>{usuarios._id}</td>
              <td>{usuarios.connection}</td>
              <td>{usuarios.email}</td>
              <td>{usuarios.rol}</td>
              
            </>
          )}
        <td>
          <div className="flex w-full justify-around">
            {editar? ( 
            <>
              <Tooltip title="Confirmar Edición" arrow>
                <i 
                  onClick={() => actualizarUsuarios()} 
                  className="fas fa-check text-green-700 hover:text-green-500" />
              </Tooltip>
              <Tooltip title="Cancelar Edición" arrow>
                <i 
                  onClick={() => setEditar(!editar)}
                  className="fas fa-ban text-yellow-700 hover:text-yellow-500" />
              </Tooltip>
            </>
            ) : (
              <i 
                onClick={() => setEditar(!editar)}
                className="fas fa-pencil-alt text-blue-900 hover:text-blue-700" />
            )}
          </div>
        </td>
      </tr> 
  )
}

/*
const RegistroUsuarios = ({setMostrarLista}) => {

  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoUsuarios = {};
    fd.forEach((value, key) => {
      nuevoUsuarios[key] = value;
    });


    const options = {
      method: 'POST',
      url: `${BACKEND_URL}/api/usuario`,
      headers: {'Content-Type': 'application/json'},
      data: {
        _id: nuevoUsuarios._id,
        connection: nuevoUsuarios.connection,
        description: nuevoUsuarios.description,
        email: nuevoUsuarios.email,
        rol: nuevoUsuarios.rol,
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Usuario agregado con éxito");
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Error al crear el Usuario");
      });

    setMostrarLista(true);
  };


  return (
        <div>
            <form ref={form} onSubmit={submitForm} className='text-lg flex flex-col items-center'>
            <h2 className="text-4xl font-serif my-10">Crear nuevo Usuario</h2>

              <label className="my-4 font-serif" htmlFor="_id">Identificador unico: </label>
              <input name="_id" type="number" 
              className=' bg-gray-50 border rounded border-gray-400 p-1 m-2' 
              placeholder="Ingrese el id" required />

              <label className="font-serif" htmlFor="title">Nombre: </label>
              <textarea name="title" className=" bg-gray-50 border rounded border-gray-400 p-1 m-2" 
              cols="22" rows="3" placeholder="Nombre del Usuario" required></textarea>

              <label className="font-serif" htmlFor="description">Rol </label>
                <input name="description" type="text" className=' bg-gray-50 border rounded border-gray-400 p-1 m-2' 
                placeholder="Rol del usuario" required/>

              <label className="font-serif" htmlFor="status">Estado: </label>
                <select className="border rounded border-gray-400" name="status" defaultValue={0} required>
                  <option disabled value={0}>Seleccione una opción</option>
                  <option >Disponible</option>
                  <option >No disponible</option>
                </select>
                <br />  

              <button type="submit"
              className='col-span-2 bg-indigo-500 
              text-white rounded border p-3 m-5 w-1/5 hover:bg-blue-400'>Registrar Usuario</button>
            </form>
        </div>
  );
};
*/

export default Usuarios;
