import styled from "styled-components";
import { ElementType } from "react";

const BaseButton = styled.button`
    border: none;
    padding: 8px;
    border-radius: 7px;
    cursor: pointer;
`;

export const HeaderButton = styled(BaseButton)`
    background-color: #007bff;
    width: 150px;
`;
export const AddButton = styled(BaseButton)`
    background-color: ${props => props.theme.colors.primaryButtonBackground};
    width: 150px;
`;

export const EditButton = styled(BaseButton)`
    background-color: ${props => props.theme.colors.primaryButtonBackground};
    width: 80px;
`;

export const DeleteButton = styled(BaseButton)`
    background-color: ${props => props.theme.colors.deleteButtonBackground};
    width: 80px;
`;

type ButtonProps = {
    onClick: () => void;
    isShown: boolean;
    showText: string;
    hideText: string;
    Component: ElementType;
};

export const ToggleButton = ({ isShown, hideText, showText, onClick, Component }: ButtonProps) => {
    return (
        <Component onClick={onClick}>
            {isShown ? hideText : showText}
        </Component>
    );
};