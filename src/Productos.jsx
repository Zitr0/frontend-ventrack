import { nanoid } from 'nanoid';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Tooltip } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';
import dotenv from 'dotenv'
dotenv.config()

const BACKEND_URL = "https://backend-ventrack.herokuapp.com";
//const  BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Productos = () => {
  const [mostrarLista, setMostrarLista] = useState(true);
  const [productos, setProductos] = useState([]);
  const [textoBoton, setTextoBoton] = useState("Crear nuevo producto");
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

  const obtenerProductos = async () => {
    const options = {
      method: 'GET',
      url: `${BACKEND_URL}/api/producto`,
      headers: {'Content-Type': 'application/json'}
    };
     
    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setProductos(response.data.productos);
        })
      .catch(function (error) {
        console.error(error);
      });
    setEjecutarConsulta();
  };

  useEffect(() => {
    console.log("Consulta", ejecutarConsulta);
    if(ejecutarConsulta){
      obtenerProductos();
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
      setTextoBoton("Crear nuevo producto");
    }
    else{
      setTextoBoton("Volver a la lista");
    }
  }, [mostrarLista]);

  return (
    <div>
      <button onClick={() => {setMostrarLista(!mostrarLista)}} className="absolute my-10 mx-5 bg-indigo-500 
      text-white rounded border p-3 hover:bg-blue-400">{textoBoton}</button>
      {mostrarLista ? (
      <ListaProductos tablaProductos={productos} setEjecutarConsulta={setEjecutarConsulta} />
      ) : (
      <RegistroProductos 
      setMostrarLista = {setMostrarLista}
      tablaProductos = {productos}
      setProductos = {setProductos}/>
      )}
      <ToastContainer position="bottom-center" autoClose={4000} />
    </div>
  );
};


const ListaProductos = ({tablaProductos, setEjecutarConsulta}) => {

  const [busqueda, setBusqueda] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState(tablaProductos);

  useEffect(() => {
    setProductosFiltrados(
      tablaProductos.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, tablaProductos]);

  return(
    <div className="flex flex-col items-center">
      <input 
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar" 
        className="border-2 border-gray-500 my-10 px-3 py-2 focus:outline-none focus:border-indigo-500" />
      <h2 className="text-4xl font-serif my-5">Todos los productos</h2> 
        <table className="w-full tabla border-separate">
          <thead>
            <tr>
              <th className="border border-gray-400 text-gray-800 bg-gray-300">Identificador único</th>
              <th className="border border-gray-400 text-gray-800 bg-gray-300">Descripción</th>
              <th className="border border-gray-400 text-gray-800 bg-gray-300">Valor unitario</th>
              <th className="border border-gray-400 text-gray-800 bg-gray-300">Estado</th>
              <th className="border border-gray-400 text-gray-800 bg-gray-300">Actualizar</th>
            </tr>
          </thead>
          <tbody className="border border-gray-400 text-gray-800 bg-gray-200">
            {productosFiltrados.map((producto) => {
              return <FilaProductos key={nanoid()} 
              producto={producto} 
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

const FilaProductos = ({producto, setEjecutarConsulta}) => {
  console.log("Producto", producto);

  const [editar, setEditar] = useState(false);
  const [infoNuevoProducto, setInfoNuevoProducto] = useState({
    identificador : producto.identificador,
    descripcion : producto.descripcion,
    valor : producto.valor,
    estado : producto.estado
  })

  const actualizarProducto = async () => {
    console.log(infoNuevoProducto);
    //Enviar información al backend
    const options = {
      method: 'PATCH',
      url: `${BACKEND_URL}/api/producto`,
      headers: {'Content-Type': 'application/json'},
      data: {...infoNuevoProducto, identificador: producto.identificador},
    };
    
    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Producto modificado con éxito");
        setEditar(false);
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        toast.error("Error modificado el producto");
        console.error(error);
      });
  };

  return (
        <tr>
          {editar? (
            <>
              <td>
                {/* <span className=' bg-gray-50 border rounded border-gray-300 p-1 m-2'
                 type="text" value={infoNuevoProducto.identificador}
                 onChange={(e) => setInfoNuevoProducto({...infoNuevoProducto, identificador: e.target.value})} /> */}
                 <span>{infoNuevoProducto.identificador}</span>
              </td>
              <td>
                <input className=' bg-gray-50 border rounded border-gray-400 p-1 m-2'
                 type="text" value={infoNuevoProducto.descripcion}
                 onChange={(e) => setInfoNuevoProducto({...infoNuevoProducto, descripcion: e.target.value})} />
                </td>
              <td>
                <input className=' bg-gray-50 border rounded border-gray-400 p-1 m-2'
                 type="text" value={infoNuevoProducto.valor}
                 onChange={(e) => setInfoNuevoProducto({...infoNuevoProducto, valor: e.target.value})} />
              </td>
              <td>
                <input className=' bg-gray-50 border rounded border-gray-400 p-1 m-2'
                 type="text" value={infoNuevoProducto.estado}
                 onChange={(e) => setInfoNuevoProducto({...infoNuevoProducto, estado: e.target.value})} />
              </td>
            </>
          ) : (
            <>
              <td>{producto.identificador}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.valor}</td>
              <td>{producto.estado}</td>
            </>
          )}
        <td>
          <div className="flex w-full justify-around">
            {editar? ( 
            <>
              <Tooltip title="Confirmar Edición" arrow>
                <i 
                  onClick={() => actualizarProducto()} 
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

const RegistroProductos = ({setMostrarLista}) => {

  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoProducto = {};
    fd.forEach((value, key) => {
      nuevoProducto[key] = value;
    });


    const options = {
      method: 'POST',
      url: `${BACKEND_URL}/api/producto`,
      headers: {'Content-Type': 'application/json'},
      data: {
        identificador: nuevoProducto.identificador,
        descripcion: nuevoProducto.descripcion,
        valor: nuevoProducto.valor,
        estado: nuevoProducto.estado
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Producto agregado con éxito");
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Error al crear el producto");
      });

    setMostrarLista(true);
  };


  return (
        <div>
            <form ref={form} onSubmit={submitForm} className='text-lg flex flex-col items-center'>
            <h2 className="text-4xl font-serif my-10">Crear nuevo producto</h2>

              <label className="my-4 font-serif" htmlFor="identificador">Identificador unico: </label>
              <input name="identificador" type="number" 
              className=' bg-gray-50 border rounded border-gray-400 p-1 m-2' 
              placeholder="Ingrese el identificador" required />

              <label className="font-serif" htmlFor="descripcion">Descripción: </label>
              <textarea name="descripcion" className=" bg-gray-50 border rounded border-gray-400 p-1 m-2" 
              cols="22" rows="3" placeholder="Descripción del producto" required></textarea>

              <label className="font-serif" htmlFor="valor">Valor unitario: </label>
                <input name="valor" type="number" className=' bg-gray-50 border rounded border-gray-400 p-1 m-2' 
                placeholder="Valor del producto" required/>

              <label className="font-serif" htmlFor="estado">Estado: </label>
                <select className="border rounded border-gray-400" name="estado" defaultValue={0} required>
                  <option disabled value={0}>Seleccione una opción</option>
                  <option >Disponible</option>
                  <option >No disponible</option>
                </select>
                <br />  

              <button type="submit"
              className='col-span-2 bg-indigo-500 
              text-white rounded border p-3 m-5 w-1/5 hover:bg-blue-400'>Agregar producto</button>
            </form>
        </div>
  );
};

export default Productos;
