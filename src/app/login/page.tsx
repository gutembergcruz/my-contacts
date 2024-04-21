"use client";
import { InputText } from "@/components/InputText";

import Styles from "./login.module.scss";
import { useState } from "react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={Styles.container}>
      <h1>My Contacts</h1>
      {isLogin ? (
        <section className={Styles.boxLogin}>
          <p>Login</p>
          <InputText label="Email" />
          <InputText type="password" label="Password" />
          <div className={Styles.foot}>
            <button>Entrar</button>
            <button onClick={() => setIsLogin(false)}>Registre-se</button>
          </div>
        </section>
      ) : (
        <section className={Styles.boxLogin}>
          <p>Cadastre-se</p>
          <InputText label="Nome" />
          <InputText label="Email" />
          <InputText type="password" label="Password" />
          <div className={Styles.foot}>
            <button>Confirmar</button>
            <button onClick={() => setIsLogin(true)}>Voltar ao Login</button>
          </div>
        </section>
      )}
    </div>
  );
}
