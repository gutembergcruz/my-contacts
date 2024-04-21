import { useState, useReducer } from 'react';
import { InputText } from '@/components/InputText';
import Styles from './createItem.module.scss';
import api from '@/services/api';

interface CreateItemProps {
  onRequestClose: () => void;
}

interface State {
  nome: string;
  cpf: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  complemento: string;
  owner: string;
}

type Action = { type: string; payload: { field: string; value: string } };

const initialState: State = {
  nome: '',
  cpf: '',
  cep: '',
  rua: '',
  numero: '',
  bairro: '',
  cidade: '',
  complemento: '',
  owner: localStorage.getItem('loggedInUser') || '',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.payload.field]: action.payload.value };
    default:
      return state;
  }
}

export default function CreateItem({ onRequestClose }: CreateItemProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleChange(field: string, value: string) {
    dispatch({ type: 'UPDATE_FIELD', payload: { field, value } });
  }

  function handleSubmit() {
    api
      .post('/contacts', state)
      .then(() => {
        alert('Contato criado com sucesso!')
        window.location.reload();
      })
  }

  return (
    <div className={Styles.container}>
      <section className={Styles.boxModal}>
        <p>Novo Contato</p>
        <div className={Styles.divider}>
          <InputText
            label="Nome"
            value={state.nome}
            onChange={(e) => handleChange('nome', e)}
          />
          <InputText
            label="CPF"
            value={state.cpf}
            onChange={(e) => handleChange('cpf', e)}
          />
        </div>
        <div className={Styles.divider}>
          <InputText
            label="CEP"
            value={state.cep}
            onChange={(e) => handleChange('cep', e)}
          />
          <InputText
            label="Rua"
            value={state.rua}
            onChange={(e) => handleChange('rua', e)}
          />
        </div>
        <div className={Styles.divider}>
          <InputText
            label="Número"
            value={state.numero}
            onChange={(e) => handleChange('numero', e)}
          />
          <InputText
            label="Bairro"
            value={state.bairro}
            onChange={(e) => handleChange('bairro', e)}
          />
        </div>
        <div className={Styles.divider}>
          <InputText
            label="Cidade"
            value={state.cidade}
            onChange={(e) => handleChange('cidade', e)}
          />
          <InputText
            label="Complemento"
            value={state.complemento}
            onChange={(e) => handleChange('complemento', e)}
          />
        </div>
        <div className={Styles.foot}>
          <button onClick={handleSubmit}>Confirmar</button>
          <button onClick={() => onRequestClose()}>Cancelar</button>
        </div>
      </section>
    </div>
  );
}
