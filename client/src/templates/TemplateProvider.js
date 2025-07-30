import React from 'react';
import { CssBaseline } from "@mui/material";

const TemplateContext = React.createContext(null);

export const TemplateProvider = ({ children }) => {
    return (
        <TemplateContext.Provider value={{}}>
            <CssBaseline />
            {children}
        </TemplateContext.Provider>
    );
}

export default TemplateProvider;