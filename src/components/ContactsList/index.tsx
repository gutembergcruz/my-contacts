import { useEffect, useState } from "react";
import { InputText } from "../InputText";
import ContactItem from "./ContactItem";
import Styles from "./contactList.module.scss";
import api from "@/services/api";

interface ContactItemProps {
  changeMap(e: string): void;
}

interface ContactItemsProps {
  nome: string;
  cpf: string;
  id: number;
  mapurl: string;
}

function handleDelete(id: number) {
  api.delete(`/contacts/${id}`).then((response) => {
    alert('Contato excluido com sucesso!');
    window.location.reload();
  })
}
export default function ContactsList({changeMap}: ContactItemProps) {
  const [contacts, setContacts] = useState<ContactItemsProps[]>([]);
  useEffect(() => {
    api.get('/contacts').then((response) => {
      setContacts(response.data)
    })
  },[])

  return (
    <div>
      <div className={Styles.search}>
        <InputText label="Buscar" name="search" />
      </div>
      <div className={Styles.container}>
        {contacts.map((contact) => (
          <ContactItem
          onDelete={(id) => handleDelete(id)}
            key={contact.id}
            name={contact.nome}
            cpf={contact.cpf}
            id={contact.id}
            onViewMap={() => changeMap(contact.mapurl)}
          />
        ))}
      </div>
    </div>
  );
}
