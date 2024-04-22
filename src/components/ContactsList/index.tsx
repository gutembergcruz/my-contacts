import { useEffect, useState } from "react";
import { InputText } from "../InputText";
import ContactItem from "./ContactItem";
import Styles from "./contactList.module.scss";
import api from "@/services/api";
import { toast } from "react-toastify";

interface ContactItemProps {
  changeMap(e: string): void;
}

interface ContactItemsProps {
  nome: string;
  cpf: string;
  id: number;
  mapurl: string;
}


export default function ContactsList({ changeMap }: ContactItemProps) {
  const [contacts, setContacts] = useState<ContactItemsProps[]>([]);

  function handlegetItems() {
    const owner = localStorage.getItem("loggedInUser") || "";
    api.get(`/contacts?owner=${owner}`).then((response) => {
      setContacts(response.data);
    });
  }

  function handleDelete(id: number) {
    api.delete(`/contacts/${id}`).then((response) => {
      toast.success("Contato excluído com sucesso!");
      handlegetItems();
    });
  }

  useEffect(() => {
    handlegetItems();
  }, []);

  function handleSearch(search: string) {
    const owner = localStorage.getItem("loggedInUser") || "";
    let queryParam = "";

    if (!isNaN(Number(search.charAt(0)))) {
      queryParam = `&cpf=${search}`;
    } else {
      queryParam = `&nome=${search}`;
    }

    api.get(`/contacts?owner=${owner}${queryParam}`).then((response) => {
      setContacts(response.data);
    });
  }

  return (
    <div>
      <div className={Styles.search}>
        <InputText
          label="Buscar"
          name="search"
          onChange={(e) => handleSearch(e)}
        />
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
