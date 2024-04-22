"use client";
import { InputText } from "@/components/InputText";
import Styles from "./login.module.scss";
import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

// Função para registrar um novo usuário
function register(username: string, password: string) {
  if (localStorage.getItem(username) !== null) {
    return false;
  }

  localStorage.setItem(username, password);
  return true;
}

// Função para fazer login
function login(username: string, password: string | null) {
  if (localStorage.getItem(username) === password) {
    localStorage.setItem("loggedInUser", username);
    return true;
  }
  return false;
}

// Função reducer para manipular o estado
function reducer(state: any, action: { type: any; field: any; value: any }) {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
}

// Componente de login
export default function Login() {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    name: "",
  });
  const { email, password, name } = state;
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  // Função para lidar com o login
  function handleLogin() {
    if (login(email, password)) {
      toast.success('Login efetuado com sucesso!');
      router.push("/contacts");
    } else {
      toast.error('Usário não encontrado');
    }
  }

  // Função para lidar com o registro
  function handleRegister() {
    if (register(email, password)) {
      setIsLogin(true);
      toast.success("Registro bem-sucedido");
    } else {
      toast.warning("Usuário já registrado");
    }
  }

  // Função para manipular as mudanças nos campos de entrada
  function handleChange(field: string, value: string) {
    dispatch({ type: "SET_VALUE", field, value });
  }

  return (
    <div className={Styles.container}>
      <h1>My Contacts</h1>
      {isLogin ? (
        <section className={Styles.boxLogin}>
          <p>Login</p>
          <InputText
            label="Email"
            value={email}
            onChange={(e) => handleChange("email", e)}
          />
          <InputText
            type="password"
            label="Password"
            value={password}
            onChange={(e) => handleChange("password", e)}
          />
          <div className={Styles.foot}>
            <button onClick={handleLogin}>Entrar</button>
            <button onClick={() => setIsLogin(false)}>Registre-se</button>
          </div>
        </section>
      ) : (
        <section className={Styles.boxLogin}>
          <p>Cadastre-se</p>
          <InputText
            label="Nome"
            value={name}
            onChange={(e) => handleChange("name", e)}
          />
          <InputText
            label="Email"
            value={email}
            onChange={(e) => handleChange("email", e)}
          />
          <InputText
            type="password"
            label="Password"
            value={password}
            onChange={(e) => handleChange("password", e)}
          />
          <div className={Styles.foot}>
            <button onClick={handleRegister}>Confirmar</button>
            <button onClick={() => setIsLogin(true)}>Voltar ao Login</button>
          </div>
        </section>
      )}
    </div>
  );
}
