// Importações necessárias
import React, { useState, useReducer } from "react";
import { InputText } from "@/components/InputText";
import Styles from "./createItem.module.scss";
import api from "@/services/api";
import { toast } from "react-toastify";

// Interface para definir a estrutura do estado inicial
interface CreateItemProps {
  onRequestClose: () => void;
}

// Interface para definir a estrutura do estado do formulário
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
  latitude: string;
  longitude: string;
}

// Tipo de ação para o reducer
type Action = { type: string; payload: { field: string; value: string } };

// Estado inicial do formulário
const initialState: State = {
  nome: "",
  cpf: "",
  cep: "",
  rua: "",
  numero: "",
  bairro: "",
  cidade: "",
  complemento: "",
  owner: localStorage.getItem("loggedInUser") || "",
  latitude: "",
  longitude: "",
};

// Reducer para gerenciar as mudanças no estado do formulário
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.payload.field]: action.payload.value };
    default:
      return state;
  }
}

// Componente principal
export default function CreateItem({ onRequestClose }: CreateItemProps) {
  // Uso do reducer para gerenciar o estado do formulário
  const [state, dispatch] = useReducer(reducer, initialState);

  // Função para lidar com a mudança de valor nos campos do formulário
  function handleChange(field: string, value: string) {
    dispatch({ type: "UPDATE_FIELD", payload: { field, value } });
  }

  // Função assíncrona para lidar com a mudança no CEP e obter informações do endereço
  async function handleCEPChange(value: string) {
    dispatch({ type: "UPDATE_FIELD", payload: { field: "cep", value } });
    if (value.length === 8) {
      try {
        // Chamada à API ViaCEP para obter informações do endereço
        const response = await api.get(
          `https://viacep.com.br/ws/${value}/json/`
        );
        const data = response.data;
        dispatch({
          type: "UPDATE_FIELD",
          payload: { field: "rua", value: data.logradouro || "" },
        });
        dispatch({
          type: "UPDATE_FIELD",
          payload: { field: "bairro", value: data.bairro || "" },
        });
        dispatch({
          type: "UPDATE_FIELD",
          payload: { field: "cidade", value: data.localidade || "" },
        });
        dispatch({
          type: "UPDATE_FIELD",
          payload: { field: "complemento", value: data.complemento || "" },
        });

        // Chamada à API de Geocoding do Google Maps para obter a URL do mapa
        const geocodingResponse = await api.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            data.logradouro
          )},${encodeURIComponent(data.bairro)},${encodeURIComponent(
            data.localidade
          )},${encodeURIComponent(data.uf)}&key=${
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
          }`
        );
        const geocodingData = geocodingResponse.data;
        const location = geocodingData.results[0].geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;

        // Atualização da URL do mapa no estado do formulário
        dispatch({
          type: "UPDATE_FIELD",
          payload: { field: "latitude", value: latitude },
        });
        dispatch({
          type: "UPDATE_FIELD",
          payload: { field: "longitude", value: longitude },
        });
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  }

  // Função para lidar com o envio do formulário
  function handleSubmit() {
    api.post("/contacts", state).then(() => {
      toast.success("Contato criado com sucesso");
      window.location.reload();
    });
  }

  return (
    <div className={Styles.container}>
      <section className={Styles.boxModal}>
        <p>Novo Contato</p>
        <div className={Styles.divider}>
          <InputText
            label="Nome"
            value={state.nome}
            onChange={(e) => handleChange("nome", e)}
          />
          <InputText
            label="CPF"
            value={state.cpf}
            onChange={(e) => handleChange("cpf", e)}
          />
        </div>
        <div className={Styles.divider}>
          <InputText
            label="CEP"
            value={state.cep}
            onChange={(e) => handleCEPChange(e)}
          />
          <InputText
            label="Rua"
            value={state.rua}
            onChange={(e) => handleChange("rua", e)}
          />
        </div>
        <div className={Styles.divider}>
          <InputText
            label="Número"
            value={state.numero}
            onChange={(e) => handleChange("numero", e)}
          />
          <InputText
            label="Bairro"
            value={state.bairro}
            onChange={(e) => handleChange("bairro", e)}
          />
        </div>
        <div className={Styles.divider}>
          <InputText
            label="Cidade"
            value={state.cidade}
            onChange={(e) => handleChange("cidade", e)}
          />
          <InputText
            label="Complemento"
            value={state.complemento}
            onChange={(e) => handleChange("complemento", e)}
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
