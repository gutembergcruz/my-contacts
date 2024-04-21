import { useState } from "react";
import { InputText } from "../InputText";
import ContactItem from "./ContactItem";
import CreateItem from "./CreateItem";
import Styles from "./contactList.module.scss";

export default function ContactsList() {

  return (
    <div>
      <div className={Styles.search}>
        <InputText label="Buscar" name="search" />
      </div>
      <div className={Styles.container}>
        <ContactItem name="Nome do contato" cpf="1212315465" />
      </div>
    </div>
  );
}
