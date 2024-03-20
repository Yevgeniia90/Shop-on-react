import React, { useEffect, useState } from 'react';
import ThemeConttext from '../contexts/ThemeContext';

const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme (theme === 'light' ? 'dark' : 'light') 
     }

    return (

        <ThemeConttext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeConttext.Provider>
    );
}

export default ThemeProvider;
