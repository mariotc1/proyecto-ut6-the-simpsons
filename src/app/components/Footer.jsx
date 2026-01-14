import React from "react";

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer bg-primary text-primary-content p-8 border-t-4 border-primary-focus">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="footer-title text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="text-2xl">🏡</span>
                                Los Simpsons API
                            </h3>
                            <p className="text-sm">
                                Explora el universo de Springfield con datos de todos tus personajes favoritos.
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="footer-title text-lg font-bold mb-4">Enlaces</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/" className="link link-hover text-primary-content">Inicio</a></li>
                                <li><a href="#characters" className="link link-hover text-primary-content">Personajes</a></li>
                                <li><a href="https://thesimpsonsapi.com" target="_blank" rel="noopener noreferrer" className="link link-hover text-primary-content">API Docs</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="footer-title text-lg font-bold mb-4">Proyecto</h3>
                            <p className="text-sm mb-2">
                                Desarrollo Web Entorno Cliente
                            </p>
                            <p className="text-sm">
                                Hecho con ❤️ y React + DaisyUI
                            </p>
                            <div className="flex gap-2 mt-4">
                                <span className="text-2xl">🍩</span>
                                <span className="text-2xl">🍺</span>
                                <span className="text-2xl">🎯</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="divider divider-primary-focus my-8"></div>
                    
                    <div className="text-center text-sm">
                        <p>© 2024 Proyecto UT6 - Los Simpsons. Todos los derechos reservados.</p>
                        <p className="mt-2">Datos proporcionados por <a href="https://thesimpsonsapi.com" target="_blank" rel="noopener noreferrer" className="link link-hover">TheSimpsonsAPI.com</a></p>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;