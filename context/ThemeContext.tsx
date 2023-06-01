"use client";

import { createContext, useState, useContext } from "react";


// Define the default theme object  
const defaultTheme:string = 'dark';
  
// Define the context object type  
type ThemeContextType = {  
  mode: string;  
  toggle: () => void;  
};  
  
// Create the context object  
export const ThemeContext = createContext<ThemeContextType>({  
  mode: defaultTheme,  
  toggle: () => {},  
});  

// Create the theme provider component  
type ThemeProviderProps = {  
  children: React.ReactNode;  
}; 

// Create the theme provider component  
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {  
  const [mode, setMode] = useState<string>(defaultTheme); 
  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
    console.log(mode);
  };
  
  return (  
    <ThemeContext.Provider value={{ mode, toggle }}>  
      <div className={`theme ${mode}`}>{children}</div>  
    </ThemeContext.Provider>  
  );  
};  