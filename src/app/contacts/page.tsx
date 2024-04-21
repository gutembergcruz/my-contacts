import ContactsList from "@/components/ContactsList";
import MapView from "@/components/MapView";

import Styles from "./contacts.module.scss";
import { FiPlus } from "react-icons/fi";

export default function Contacts() {
  return (
    <section className={Styles.container}>
      <aside>
        <div className={Styles.head}>
          <h1>Meus Contatos</h1>
          <button title="Novo Contato">
            <FiPlus />
          </button>
        </div>
        <ContactsList />
      </aside>
      <main>
        <MapView />
      </main>
    </section>
  );
}
