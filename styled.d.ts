import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primaryBackground: string;  // Główne tło strony
            secondaryBackground: string;  // Tło dla kart, paneli
            primaryText: string;  // Główny kolor tekstu
            secondaryText: string;  // Tekst pomocniczy
            buttonBackground: string;  // Kolor tła przycisków
            buttonText: string;  // Kolor
            deleteButtonBackground: string;
            primaryButtonBackground: string;
        };
    }
}