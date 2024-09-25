import React, { createContext, useState } from 'react';

// Création d'un contexte pour l'authentification
const AuthContext = createContext();

// Fournisseur de contexte
export const AuthProvider = ({children}) => {
    // Etat pour savoir si l'utilisateur est connecté ou non
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Connexion de l'utilisateur
    const login = () => setIsAuthenticated(true);

    // Déconnexion
    const logout = () => setIsAuthenticated(false);

    // Fourni l'état aux composants enfant
    // l'attribut {children} représente les éléments enfants du contexte d'authentification
    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            
            {children}
        </AuthContext.Provider>
    );
}

// Hook pour l'utilisation du contexte
export {  AuthContext };

