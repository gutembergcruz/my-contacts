import { InputText } from "@/components/InputText";
// import "./styles.scss";

export default function Login() {
  return (
    <div className="container">
      <section className="box-login">
        <InputText />
        <InputText />
        <button>Login</button>
      </section>
    </div>
  );
}
