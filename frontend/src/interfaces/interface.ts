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
    readonly?: boolean;
}

export interface ButtonProps {
    text?: string;
    width?: string;
    height?: string;
    padding?: string;
    type?: string;
    loading?: boolean;
    onClick?: () => unknown;
    borderRadius?: string;
    color?: string;
}

export interface Mood {
     _id: string, 
    name: string, 
    color: string,
    count: number,
    status: boolean
}