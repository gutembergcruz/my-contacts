import { InputText } from "@/components/InputText";

import Styles from "./login.module.scss";

export default function Login() {
  return (
    <div className={Styles.container}>
      <h1>My Contacts</h1>
      <section className={Styles.boxLogin}>
        <p>Login</p>
        <InputText label="Email" />
        <InputText type="password" label="Password" />
        <button>Login</button>
      </section>
    </div>
  );
}
