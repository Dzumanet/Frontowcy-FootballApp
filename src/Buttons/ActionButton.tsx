import styled from "styled-components";
import { ElementType } from "react";

const BaseButton = styled.button`
    border: none;
    padding: 5px 10px;
    border-radius: 6px;
    cursor: pointer;
`;

export const DeleteButton = styled(BaseButton)`
    background-color: ${props => props.theme.colors.deleteButtonBackground};
`;
export const CancelButton = styled(BaseButton)`
    background-color: ${props => props.theme.colors.primaryButtonBackground};
`;
export const SaveButton = styled(BaseButton)`
    background-color: ${props => props.theme.colors.primaryButtonBackground};
`;

type ActionButtonProps = {
    onClick?: () => void;
    label: string;
    Component: ElementType;
    type?: string;
    attribute?: boolean;
}

export const ActionButton = ({ onClick, label, Component, type, attribute }: ActionButtonProps) => {

    return (
        <Component type={type} attribute={attribute} onClick={onClick}>
            {label}
        </Component>
    );


};
