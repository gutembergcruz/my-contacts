import React, { useState, useReducer } from "react";
import { InputText } from "@/components/InputText";
import Styles from "./createItem.module.scss";
import api from "@/services/api";
import { toast } from "react-toastify";

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
  mapurl: string;
}

type Action = { type: string; payload: { field: string; value: string } };

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
  mapurl: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.payload.field]: action.payload.value };
    default:
      return state;
  }
}

export default function CreateItem({ onRequestClose }: CreateItemProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleChange(field: string, value: string) {
    dispatch({ type: "UPDATE_FIELD", payload: { field, value } });
  }

  async function handleCEPChange(value: string) {
    dispatch({ type: "UPDATE_FIELD", payload: { field: "cep", value } });
    if (value.length === 8) {
      try {
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

        const geocodingResponse = await api.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`
          )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const geocodingData = geocodingResponse.data;
        const location = geocodingData.results[0].geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;

        const iframeUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0.3599.984896802188!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dcfbb566eef661%3A0x1c27fb2b25e207ab!2s${encodeURIComponent(
          `${data.logradouro}, ${data.numero} - ${data.bairro}, ${data.cidade} - ${data.uf}, ${value}`
        )}!5e0!3m2!1spt-BR!2sbr&zoom=15`;

        dispatch({
          type: "UPDATE_FIELD",
          payload: { field: "mapurl", value: iframeUrl },
        });
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  }

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
