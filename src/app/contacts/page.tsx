"use client";
import ContactsList from "@/components/ContactsList";
import Styles from "./contacts.module.scss";
import { FiMenu, FiPlus } from "react-icons/fi";
import CreateItem from "@/components/ContactsList/CreateItem";
import { useState } from "react";
import { useRouter } from "next/navigation";

function logout() {
  localStorage.removeItem("loggedInUser");

  window.location.href = "/login";
}

function deleteAccount() {
  const username = localStorage.getItem("loggedInUser");
  if (username !== null) {
    localStorage.removeItem(username);
    localStorage.removeItem("loggedInUser");

    window.location.href = "/login";
  }
}

export default function Contacts() {
  const [isCreate, setIsCreate] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const loggedInUser = localStorage.getItem('loggedInUser');


  return (
    <section className={Styles.container}>
      {isCreate && <CreateItem onRequestClose={() => setIsCreate(false)} />}
      <aside>
        <div className={Styles.head}>
          <h1>Meus Contatos</h1>
          <button title="Novo Contato" onClick={() => setIsCreate(true)}>
            <FiPlus />
          </button>
        </div>
        <ContactsList />
      </aside>
      <main>
        <div className={Styles.profile}>
          <div className={Styles.collapse}>
            <button onClick={() => setIsCollapsed(!isCollapsed)}>
              <FiMenu />
            </button>
            {isCollapsed && (
              <div>
                <button onClick={logout}>Sair</button>
                <button onClick={deleteAccount}>Excluir Conta</button>
              </div>
            )}
          </div>
        </div>
        <iframe
          className={Styles.iframeMap}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.984896802188!2d-49.2450741!3d-25.53888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dcfbb566eef661%3A0x1c27fb2b25e207ab!2sRua%20Expedicion%C3%A1rio%20Bruno%20Estrifica%2C%20268%20-%20Alto%20Boqueir%C3%A3o%2C%20Curitiba%20-%20PR%2C%2081850-370!5e0!3m2!1spt-BR!2sbr!4v1713668730724!5m2!1spt-BR!2sbr"
        ></iframe>
      </main>
    </section>
  );
}
