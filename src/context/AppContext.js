import React, {useState} from 'react';

const AppContext = React.createContext();

export const TenisProvider = ({children}) => {

    const [config, setConfig] = useState(null);
    const [user, setUser] = useState(null);
    const [profil, setProfil] = useState(null);

    return (
        <AppContext.Provider value={{data: config, user, profil, setUser, setConfig, setProfil}} >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;