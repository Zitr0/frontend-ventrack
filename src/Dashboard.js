import React from 'react';
//import { BrowserRouter, Route, Link } from 'react-router-dom'

class Dashboard extends React.Component {
    sidebarToggle() {
        var sidebar = document.getElementById('sidebar');
       
        if (sidebar.style.display === "none") {
            sidebar.style.display = "block";
        } else {
            sidebar.style.display = "none";
        }
    }
     profileToggle() {
      var profileDropdown = document.getElementById('ProfileDropDown');
        if (profileDropdown.style.display === "block") {
            profileDropdown.style.display = "none";
        } else {
            profileDropdown.style.display = "block";
        }
    }
render() {
  return (
    <div class="mx-auto bg-grey-400">
   
    <div class="min-h-screen flex flex-col">
       
        <header class="bg-nav">
            <div class="flex justify-between">
                <div class="p-1 mx-3 inline-flex items-center">
                    <i class="fas fa-bars pr-2 text-white" onClick={this.sidebarToggle}></i>
                    <h1 class="text-white p-2">Ventrack</h1>
                </div>
                
            </div>
        </header>
      
        <div class="flex flex-1">
          
            <aside id="sidebar" class="bg-side-nav w-1/2 md:w-1/6 lg:w-1/6 border-r border-side-nav hidden md:block lg:block">
                <ul class="list-reset flex flex-col">
                    <li class=" w-full h-full py-3 px-2 border-b border-light-border bg-white">
                        <a href="#"
                           class="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
                            <i class="fas fa-tachometer-alt float-left mx-2"></i>
                           Panel de Control
                            <span><i class="fas fa-angle-right float-right"></i></span>
                        </a>
                    </li>
                    
                </ul>
            </aside>
           
            <main class="bg-white-300 flex-1 p-3 overflow-hidden">
                <div class="flex flex-col">
                  
                    <div class="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
                        
                        <div class="shadow bg-info border-l-8 hover:bg-info-dark border-info-dark mb-2 p-2 md:w-1/4 mx-2">
                            <div class="p-4 flex flex-col">
                                <a href="/RegistroUsuarios" class="no-underline text-white text-2xl">
                                    Registro
                                </a>
                                <a href="/RegistroUsuarios" class="no-underline text-white text-lg">
                                de Personas
                                </a>
                            </div>
                        </div>
                       
                        <div class="shadow bg-success border-l-8 hover:bg-success-dark border-success-dark mb-2 p-2 md:w-1/4 mx-2">
                            <div class="p-4 flex flex-col">
                                <a href="/Productos" class="no-underline text-white text-2xl">
                                   Registro
                                </a>
                                <a href="/Productos" class="no-underline text-white text-lg">
                                    de productos
                                </a>
                            </div>
                        </div>

                        <div class="shadow bg-warning border-l-8 hover:bg-warning-dark border-warning-dark mb-2 p-2 md:w-1/4 mx-2">
                            <div class="p-4 flex flex-col">
                                <a href="/Ventas" class="no-underline text-white text-2xl">
                                    Registro
                                </a>
                                <a href="/Ventas" class="no-underline text-white text-lg">
                                    de Ventas
                                </a>
                            </div>
                        </div>
                    </div>
                  
                    <div class="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
                       
                        <div class="rounded overflow-hidden shadow bg-white mx-2 w-full">
                            <div class="px-6 py-2 border-b border-light-grey">
                                <div class="font-bold text-xl">Roles/Permisos de personas registradas</div>
                            </div>
                            {/* <div class="table-responsive">
                                <table class="table text-grey-darkest">
                                    <thead class="bg-grey-dark text-white text-normal">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Rol</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Crear</th>
                                        <th scope="col">Leer</th>
                                        <th scope="col">Editar</th>
                                        <th scope="col">Eliminar</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>
                                            <button class="bg-success hover:bg-success-dark text-white font-light py-1 px-2 rounded-full">
                                                Felipe Grisales
                                            </button>
                                        </td>
                                        <td>Administrador</td>
                                        <td>Activo</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>
                                            <button class="bg-blue-500 hover:bg-blue-800 text-white font-light py-1 px-2 rounded-full">
                                               Sara Valentina Ochoa
                                            </button>
                                        </td>
                                        <td>Vendedora</td>
                                        <td>Activo</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>
                                            <button class="bg-blue-500 hover:bg-blue-800 text-white font-light py-1 px-2 rounded-full">
                                              Nora Luz Correa
                                            </button>
                                        </td>
                                        <td>Vendedora</td>
                                        <td>Activo</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>
                                            <button class="bg-blue-500 hover:bg-blue-800 text-white font-light py-1 px-2 rounded-full">
                                                Camilo Ortiz Villegas
                                            </button>
                                        </td>
                                        <td>Vendedor</td>
                                        <td>Activo</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>
                                            <button class="bg-blue-500 hover:bg-blue-800 text-white font-light py-1 px-2 rounded-full">
                                                Sebastian Yépez Acevedo
                                            </button>
                                        </td>
                                        <td>Vendedor</td>
                                        <td>Activo</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div> */}
                        </div>
                       
                    </div>
                   
                  
                   
                </div>
            </main>
          
        </div>
       
        <footer class="bg-grey-darkest text-white p-2">
            <div class="flex flex-1 mx-auto"></div>
            <div class="flex flex-1 mx-auto"></div>
        </footer>
     
    </div>
</div>
  );
  
}
}
export default Dashboard;