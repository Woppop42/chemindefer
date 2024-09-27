import React, { createContext, useState, useEffect} from 'react';
// import axios from 'axios';

// Création d'un contexte pour l'authentification
const AuthContext = createContext();

// Fournisseur de contexte
export const AuthProvider = ({children}) => {
    // Etat pour savoir si l'utilisateur est connecté ou non
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Récupération des infos de l'user lors du chargement du composant
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userInfo = JSON.parse(localStorage.getItem('user'));

        if(token && userInfo)
        {
            setIsAuthenticated(true);
            setUser(userInfo);
        }
    }, []);
    // Déconnexion
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        console.log("Utilisateur déconnecté.")
    }

    // Fourni l'état aux composants enfant
    // l'attribut {children} représente les éléments enfants du contexte d'authentification
    return(
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser, logout}}>
            
            {children}
        </AuthContext.Provider>
    );
}


export {  AuthContext };

