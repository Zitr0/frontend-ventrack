import { nanoid } from 'nanoid';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Tooltip } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_URL = "https://backend-ventrack.herokuapp.com";

const Ventas = () => {
  const [mostrarLista, setMostrarLista] = useState(true);
  const [ventas, setVentas] = useState([]);
  const [textoBoton, setTextoBoton] = useState("Crear nueva venta");
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

  const obtenerVentas = async () => {
    const options = {
      method: 'GET',
      url: `${BACKEND_URL}/api/venta`,
      headers: {'Content-Type': 'application/json'}
    };
     
    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setVentas(response.data.ventas);
        })
      .catch(function (error) {
        console.error(error);
      });
    setEjecutarConsulta();
  };

  useEffect(() => {
    console.log("Consulta", ejecutarConsulta);
    if(ejecutarConsulta){
      obtenerVentas();
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
      setTextoBoton("Agregar nueva Venta");
    }
    else{
      setTextoBoton("Volver a la lista");
    }
  }, [mostrarLista]);

  return (
    <div>
      <div className="mx-auto bg-grey-400">
      <header className="bg-nav">
            <div className="flex justify-between">
                <div className="p-1 mx-3 inline-flex items-center">
                    <i className="fas fa-bars pr-2 text-white"></i>
                    <h1 className="text-white p-2">Ventrack</h1>
                </div>
                
            </div>
        </header>
      </div>
      <button onClick={() => {setMostrarLista(!mostrarLista)}} className="absolute my-10 mx-5 bg-gray-800 
      text-white rounded border p-3 hover:bg-gray-600">{textoBoton}</button>
      {mostrarLista ? (
      <ListaVentas tablaVentas={ventas} setEjecutarConsulta={setEjecutarConsulta} />
      ) : (
      <RegistroVentas 
      setMostrarLista = {setMostrarLista}
      tablaProductos = {ventas}
      setProductos = {setVentas}/>
      )}
      <ToastContainer position="bottom-center" autoClose={4000} />
    </div>
  );
};


const ListaVentas = ({tablaVentas, setEjecutarConsulta}) => {

  const [busqueda, setBusqueda] = useState('');
  const [VentasFiltradas, setVentasFiltradas] = useState(tablaVentas);

  useEffect(() => {
    setVentasFiltradas(
      tablaVentas.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, tablaVentas]);

  return(
    <div>
    <div className="flex justify-end px-8">
      <input 
    value={busqueda}
    onChange={(e) => setBusqueda(e.target.value)}
    placeholder="Buscar" 
    className="border-2 border-gray-500 my-10 px-3 py-2 focus:outline-none focus:border-indigo-500" />
    </div>
    <h2 className="text-4xl text-white font-serif my-5 shadow bg-warning border-l-8 border-warning-dark mb-2 p-2 md:w-1/4 mx-2">Ventas</h2> 
    <div className="flex flex-col items-center">
        <table className="w-full border-separate px-8">
          <thead>
            <tr>
              <th className="text-white bg-gray-500">Id</th>
              <th className="text-white bg-gray-500">Cantidad</th>
              <th className="text-white bg-gray-500">Total</th>
              <th className="text-white bg-gray-500">ValorUnitario</th>
              <th className="text-white bg-gray-500">Fecha</th>
              <th className="text-white bg-gray-500">Cliente</th>
              <th className="text-white bg-gray-500">Documento</th>
              <th className="text-white bg-gray-500">NombreDeEncargado</th>
            </tr>
          </thead>
          <tbody className="border border-gray-400 text-gray-800 bg-gray-200">
            {VentasFiltradas.map((venta) => {
              return <FilaVentas key={nanoid()} 
              venta={venta} 
              setEjecutarConsulta={setEjecutarConsulta} />;
            })}
          </tbody>
        </table>
        <Link to="/dashboard">
          <button className="bg-gray-800 my-10
             text-white rounded border p-4  hover:bg-gray-600">Página principal</button>
        </Link>
    </div>
    </div>
  );
};

const FilaVentas = ({venta, setEjecutarConsulta}) => {
  console.log("Venta", venta);

  const [editar, setEditar] = useState(false);
  const [infoNuevaVenta, setInfoNuevaVenta] = useState({
    Id : venta.Id,
    Cantidad : venta.Cantidad,
    Total : venta.Total,
    ValorUnitario : venta.ValorUnitario,
    Fecha : venta.Fecha,
    Cliente : venta.Cliente,
    Documento : venta.Documento,
    NombreDeEncargado : venta.NombreDeEncargado
  })

  const actualizarVenta = async () => {
    console.log(infoNuevaVenta);
    //Enviar información al backend
    const options = {
      method: 'PATCH',
      url: `${BACKEND_URL}/api/venta`,
      headers: {'Content-Type': 'application/json'},
      //data: {...infoNuevoProducto, id: producto._id},
      data: {...infoNuevaVenta, Id: venta.Id},
    };
    
    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Venta actualizada con éxito");
        setEditar(false);
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        toast.error("Error actualizando el producto");
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
                 <span>{infoNuevaVenta.Id}</span>
              </td>
              <td>
                <input className=' bg-gray-50 border rounded border-gray-400 p-1 m-2'
                 type="number" value={infoNuevaVenta.Cantidad}
                 onChange={(e) => setInfoNuevaVenta({...infoNuevaVenta, Cantidad: e.target.value})} />
              </td>
              <td>
                <input className=' bg-gray-50 border rounded border-gray-400 p-1 m-2'
                 type="number" value={infoNuevaVenta.Total}
                 onChange={(e) => setInfoNuevaVenta({...infoNuevaVenta, Total: e.target.value})} />
              </td>
              <td>
                <input className=' bg-gray-50 border rounded border-gray-400 p-1 m-2'
                 type="number" value={infoNuevaVenta.ValorUnitario}
                 onChange={(e) => setInfoNuevaVenta({...infoNuevaVenta, ValorUnitario: e.target.value})} />
              </td>
              <td>
                <input className=' bg-gray-50 border rounded border-gray-400 p-1 m-2'
                 type="date" value={infoNuevaVenta.Fecha}
                 onChange={(e) => setInfoNuevaVenta({...infoNuevaVenta, Fecha: e.target.value})} />
              </td>
              <td>
                <input className=' bg-gray-50 border rounded border-gray-400 p-1 m-2'
                 type="text" value={infoNuevaVenta.Cliente}
                 onChange={(e) => setInfoNuevaVenta({...infoNuevaVenta, Cliente: e.target.value})} />
              </td>
              <td>
                <input className=' bg-gray-50 border rounded border-gray-400 p-1 m-2'
                 type="number" value={infoNuevaVenta.Documento}
                 onChange={(e) => setInfoNuevaVenta({...infoNuevaVenta, Documento: e.target.value})} />
              </td>
              <td>
                <input className=' bg-gray-50 border rounded border-gray-400 p-1 m-2'
                 type="number" value={infoNuevaVenta.ValorUnitario}
                 onChange={(e) => setInfoNuevaVenta({...infoNuevaVenta, ValorUnitario: e.target.value})} />
              </td>

            </>
          ) : (
            <>
              <td>{venta.Id}</td>
              <td>{venta.Cantidad}</td>
              <td>{venta.Total}</td>
              <td>{venta.ValorUnitario}</td>
              <td>{venta.Fecha}</td>
              <td>{venta.Cliente}</td>
              <td>{venta.Documento}</td>
              <td>{venta.NombreDeEncargado}</td>
            </>
          )}
        <td>
          <div className="flex w-full justify-around">
            {editar? ( 
            <>
              <Tooltip title="Confirmar Edición" arrow>
                <i 
                  onClick={() => actualizarVenta()} 
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

const RegistroVentas = ({setMostrarLista}) => {

  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevaVenta = {};
    fd.forEach((value, key) => {
      nuevaVenta[key] = value;
    });


    const options = {
      method: 'POST',
      url: `${BACKEND_URL}/api/venta`,
      headers: {'Content-Type': 'application/json'},
      data: {
        Id: nuevaVenta.Id,
        Cantidad: nuevaVenta.Cantidad,
        Total: nuevaVenta.Total,
        ValorUnitario: nuevaVenta.ValorUnitario,
        Fecha: nuevaVenta.Fecha,
        Cliente: nuevaVenta.Cliente,
        Documento: nuevaVenta.Documento,
        NombreDeEncargado: nuevaVenta.NombreDeEncargado
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Venta agregada con éxito");
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Error al crear la Venta");
      });

    setMostrarLista(true);
  };


  return (
        <div>
            <form ref={form} onSubmit={submitForm} className='text-lg flex flex-col items-center'>
            <h2 className="text-4 xl font-serif my-10">Crear nueva Venta</h2>

              <label className="my-4 font-serif" htmlFor="identificador">Id: </label>
              <input name="Id" type="number" 
              className=' bg-gray-50 border rounded border-gray-400 p-1 m-2' 
              placeholder="Ingrese el Id" required />

              <label className="my-4 font-serif" htmlFor="Cantidad">Cantidad: </label>
              <input name="Cantidad" type="number" 
              className=' bg-gray-50 border rounded border-gray-400 p-1 m-2' 
              placeholder="Ingrese la Cantidad" required />

              <label className="my-4 font-serif" htmlFor="Total">Total: </label>
              <input name="Total" type="number" 
              className=' bg-gray-50 border rounded border-gray-400 p-1 m-2' 
              placeholder="Ingrese el Total" required />              

              <label className="my-4 font-serif" htmlFor="ValorUnitario">Valor Unitario: </label>
              <input name="ValorUnitario" type="number" 
              className=' bg-gray-50 border rounded border-gray-400 p-1 m-2' 
              placeholder="Ingrese el Valor unitario" required />

              <label className="my-4 font-serif" htmlFor="Fecha">Fecha: </label>
              <input name="Fecha" type="date" 
              className=' bg-gray-50 border rounded border-gray-400 p-1 m-2' 
              placeholder="Ingrese la Fecha" required />

              <label className="my-4 font-serif" htmlFor="Cliente">Cliente: </label>
              <input name="Cliente" type="text" 
              className=' bg-gray-50 border rounded border-gray-400 p-1 m-2' 
              placeholder="Ingrese el nombre del cliente" required />

              <label className="my-4 font-serif" htmlFor="Documento">Documento: </label>
              <input name="Documento" type="number" 
              className=' bg-gray-50 border rounded border-gray-400 p-1 m-2' 
              placeholder="Ingrese el # de documento" required />

              <label className="my-4 font-serif" htmlFor="NombreDeEncargado">Nombre de encargado: </label>
              <input name="NombreDeEncargado" type="text" 
              className=' bg-gray-50 border rounded border-gray-400 p-1 m-2' 
              placeholder="Ingrese el nombre del encargado" required />
                
                <br />  

              <button type="submit"
              className='col-span-2 bg-gray-800 
              text-white rounded border p-3 m-5 w-1/5 hover:bg-gray-600'>Agregar Venta</button>
            </form>
        </div>
  );
};



export default Ventas;