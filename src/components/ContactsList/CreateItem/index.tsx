import { InputText } from "@/components/InputText";
import Styles from "./createItem.module.scss";

export default function CreateItem() {
  return (
    <div className={Styles.container}>
      <section className={Styles.boxModal}>
        <p>Novo Contato</p>
        <div className={Styles.divider}>
          <InputText label="Nome" />
          <InputText label="CPF" />
        </div>
        <div className={Styles.divider}>
          <InputText label="CEP" />
          <InputText label="Rua" />
        </div>
        <div className={Styles.divider}>
          <InputText label="Número" />
          <InputText label="Bairro" />
        </div>
        <div className={Styles.divider}>
          <InputText label="Cidade" />
          <InputText label="Complemento" />
        </div>
        <div className={Styles.foot}>
          <button>Confirmar</button>
          <button>Cancelar</button>
        </div>
      </section>
    </div>
  );
}
