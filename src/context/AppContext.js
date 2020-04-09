import React, {useState} from 'react';

const AppContext = React.createContext();

export const TenisProvider = ({children}) => {

    const [config, setConfig] = useState(null);
    const [user, setUser] = useState(null);

    return (
        <AppContext.Provider value={{data: config, user, setUser, setConfig}} >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;