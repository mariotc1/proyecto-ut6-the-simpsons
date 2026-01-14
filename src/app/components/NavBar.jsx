import React from "react";

class NavBar extends React.Component {
    render() {
        return (
            <div className="navbar bg-primary shadow-lg border-b-4 border-primary-focus">
                <div className="flex-1">
                    <a href="/" className="btn btn-ghost text-xl font-bold text-primary-content flex items-center gap-2">
                        <span className="text-2xl">🏡</span>
                        Los Simpsons API
                    </a>
                </div>
                <div className="flex gap-2">
                    <div className="form-control">
                        <input 
                            type="text" 
                            placeholder="Buscar personaje..." 
                            className="input input-bordered bg-base-100 border-primary-focus w-24 md:w-auto text-primary-content placeholder-primary-focus" 
                        />
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar bg-base-100 border-primary-focus">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Homer Simpson"
                                    src="https://cdn.thesimpsonsapi.com/500/character/1.webp" 
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow border border-primary-focus">
                            <li>
                                <a className="justify-between">
                                    Perfil
                                    <span className="badge badge-primary">Nuevo</span>
                                </a>
                            </li>
                            <li><a>Configuración</a></li>
                            <li><a>Salir</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default NavBar;