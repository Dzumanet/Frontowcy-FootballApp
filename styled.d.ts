import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primaryBackground: string;
            secondaryBackground: string;
            primaryText: string;
            secondaryText: string;
            buttonBackground: string;
            buttonText: string;
            deleteButtonBackground: string;
            primaryButtonBackground: string;
            errorText: string;

        };
    }
}