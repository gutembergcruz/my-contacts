'use client'
import { FiXCircle } from 'react-icons/fi';
import Styles from './InputText.module.scss'
import { useEffect, useState } from 'react';

interface InputProps {
    name?: string;
    label: string;
    value?: string;
    type?: string;
    onChange?: (value: string) => void;
}
export function InputText({ name, label, value, onChange, type }: InputProps) {
    const [inputValue, setInputValue] = useState(value || '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    useEffect(() => {
        setInputValue(value || '');
    }, [value]);

    const handleClear = () => {
        setInputValue('');
        if (onChange) {
            onChange('');
        }
    };

    return (
        <div className={Styles.container}>
            <input name={name} required type={type === 'password' ? 'password' : 'text'} value={inputValue} onChange={handleChange}  />
            <label htmlFor="">{label}</label>
            <button onClick={() => handleClear()}> <FiXCircle size={20} /> </button>
        </div>
    );
}