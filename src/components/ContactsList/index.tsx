import { useEffect, useState } from "react";
import { InputText } from "../InputText";
import ContactItem from "./ContactItem";
import Styles from "./contactList.module.scss";
import api from "@/services/api";
import { toast } from "react-toastify";

// Define a forma das propriedades do componente
interface ContactItemProps {
  changeMap(e: string): void;
}

// Define a forma das propriedades de cada contato
interface ContactItemsProps {
  nome: string;
  cpf: string;
  id: number;
  latitude: string;
  longitude: string;
}

// Componente ContactsList
export default function ContactsList({ changeMap }: ContactItemProps) {
  const [contacts, setContacts] = useState<ContactItemsProps[]>([]);

  // Função para buscar os contatos do usuário logado
  function handlegetItems() {
    const owner = localStorage.getItem("loggedInUser") || "";
    api.get(`/contacts?owner=${owner}`).then((response) => {
      setContacts(response.data);
    });
  }

  // Função para deletar um contato
  function handleDelete(id: number) {
    api.delete(`/contacts/${id}`).then((response) => {
      toast.success("Contato excluído com sucesso!");
      handlegetItems();
    });
  }

  // Carrega os contatos ao montar o componente
  useEffect(() => {
    handlegetItems();
  }, []);

  // Função para buscar contatos por nome ou CPF
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
            onViewMap={() => changeMap(`${contact.latitude},${contact.longitude}`)}
            />
        ))}
      </div>
    </div>
  );
}
