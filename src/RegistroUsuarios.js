import React from 'react';
import { Link } from 'react-router-dom'
class Roles extends React.Component {
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
           
            <main class="bg-gray-700 flex-1 p-3 overflow-hidden">
            <div class="h-screen font-sans ">
    <div class="container mx-auto h-full flex flex-1 justify-center items-center">
        <div class="w-full max-w-lg">
            <div class="leading-loose">
                <form class="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
                    <p class="text-gray-800 font-medium">Registrar Persona</p>
                    <div class="">
                        <label class="block text-sm text-gray-00" for="cus_name">Nombre</label>
                        <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="" placeholder="Tu Nombre" aria-label="Name" />
                    </div>
                    <div class="mt-2">
                        <label class="block text-sm text-gray-600" for="cus_email">Correo</label>
                        <input class="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="Tu Correo" aria-label="Email" />
                    </div>
                    <div class="mt-2">
                        <label class=" block text-sm text-gray-600" for="cus_email">Teléfono</label>
                        <input class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="number" required="" placeholder="teléfono" aria-label="Email" />
                    </div>
                    <div class="mt-2">
                        <label class="hidden text-sm block text-gray-600" for="cus_email">Rol</label>
                       <select name="deporte">
                                <option>Rol</option>
                                <option>Administrador</option>
                                <option>Vendedor</option>
                                <option>Cliente</option>
                        </select>
                    </div>
                    
                   
                    <div class="mt-4">
                    <Link class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit" to={'/'}>  Registrar
                                   </Link>
                       
                    </div>
                   
                
                </form>
            </div>
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
export default Roles;