"use client";
import ContactsList from "@/components/ContactsList";
import Styles from "./contacts.module.scss";
import { FiMenu, FiPlus } from "react-icons/fi";
import CreateItem from "@/components/ContactsList/CreateItem";
import { useState } from "react";
import { toast } from "react-toastify";

function logout() {
  localStorage.removeItem("loggedInUser");
  toast.success('Logout efetuado com sucesso!');
  window.location.href = "/login";
}

function deleteAccount() {
  const username = localStorage.getItem("loggedInUser");
  if (username !== null) {
    localStorage.removeItem(username);
    localStorage.removeItem("loggedInUser");
    toast.success('Conta excluída com sucesso!');
    window.location.href = "/login";
  }
}

export default function Contacts() {
  const [isCreate, setIsCreate] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [map, setMap] = useState('');

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
        <ContactsList changeMap={(e: string) => setMap(e)} />
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
          src={map}
        ></iframe>
      </main>
    </section>
  );
}
