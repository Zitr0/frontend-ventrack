import logo from './logo.png';
import './styles/styles.css';
import { useAuth0 } from "@auth0/auth0-react";

function Home(){

const { loginWithRedirect } = useAuth0();
   return <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />               
                 
                        <button onClick={() => loginWithRedirect()}
                                type="button" 
                                className="align-content:center bg-indigo-500 text-white rounded border p-2 hover:bg-blue-400" 
                                value="Acceso" >
                                Ingreso Plataforma Ventrack
                        </button>
                   
                </header>
            </div>
}

export default Home;
