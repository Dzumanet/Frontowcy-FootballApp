import { ReactNode } from "react";
import styled from "styled-components";

type ErrorText = {
    children: ReactNode;
}

const StyledText = styled.p`
color: ${props => props.theme.colors.errorText};
    
`

export const ErrorText = ({ children }: ErrorText) => {

    return (
<StyledText>
    { children }
</StyledText>
    );
};