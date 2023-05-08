import { inputValue } from '../types'

export interface InputProps {
    value: inputValue;
    onChange: (e: any) => any;
    width?: string;
    height?: string;
    placeholder?: string;
    type?: string;
    label?: string;
    error?: string;
}

export interface ButtonProps {
    text?: string,
    width: string,
    height: string,
    onClick: () => unknown;
}