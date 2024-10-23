import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FootballApp } from "./FootballApp.tsx";
import { useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { FaMoon, FaSun } from "react-icons/fa";

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${props => props.theme.colors.primaryBackground};
    }
`;

const queryClient = new QueryClient();

export const App = () => {
    const [isLight, setIsLight] = useState(true);

    const light = {
        colors: {
            primaryBackground: '#ffffff',
            secondaryBackground: '#e5e4e4',
            primaryText: '#000000',
            secondaryText: '#666666',
            buttonBackground: '#1D4ED8',
            buttonText: '#ffffff',
            deleteButtonBackground: '#e62828',
            primaryButtonBackground: '#b8b8b8'
        }
    };

    const dark = {
        colors: {
            primaryBackground: '#121212',
            secondaryBackground: '#757575',
            primaryText: '#ffffff',
            secondaryText: '#cccccc',
            buttonBackground: '#6366F1',
            buttonText: '#ffffff',
            deleteButtonBackground: '#e62828',
            primaryButtonBackground: '#5a5a5a'

        }
    };

    const ToggleThemeButton = styled.button`
        font-size: 20px;
        border: none;
        line-height: 20px;
        padding: 5px;
        cursor: pointer;
        background: none;
        color: ${props => props.theme.colors.primaryText};
        
    `

    const toggleTheme = () => {
        setIsLight(prevLight => !prevLight);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={isLight ? light : dark}>
                <GlobalStyle/>
                <ToggleThemeButton onClick={toggleTheme}>{isLight ? <FaMoon/> : <FaSun/>}</ToggleThemeButton>
                <FootballApp/>
            </ThemeProvider>

        </QueryClientProvider>
    );
};