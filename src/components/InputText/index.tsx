'use client'
import { FiXCircle } from 'react-icons/fi';
import Styles from './InputText.module.scss'
import { useEffect, useState } from 'react';

// Define a forma das propriedades do componente
interface InputProps {
    name?: string;
    label: string;
    value?: string;
    type?: string;
    onChange?: (value: string) => void;
}

// Componente InputText
export function InputText({ name, label, value, onChange, type }: InputProps) {
    const [inputValue, setInputValue] = useState(value || '');

    // Função para lidar com a mudança de valor do input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    // Atualiza o valor do input ao mudar a propriedade 'value'
    useEffect(() => {
        setInputValue(value || '');
    }, [value]);

    // Função para limpar o input
    const handleClear = () => {
        setInputValue('');
        if (onChange) {
            onChange('');
        }
    };

    return (
        <div className={Styles.container}>
            <input name={name} id={label} required type={type === 'password' ? 'password' : 'text'} value={inputValue} onChange={handleChange}  />
            <label htmlFor={label}>{label}</label>
            <button onClick={() => handleClear()}> <FiXCircle size={20} /> </button>
        </div>
    );
}
