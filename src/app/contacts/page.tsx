import ContactsList from "@/components/ContactsList";
import MapView from "@/components/MapView";

import Styles from './contacts.module.scss';

export default function Contacts() {
  return (
    <section className={Styles.container}>
      <aside>
        <ContactsList />
      </aside>
      <main>
        <MapView />
      </main>
    </section>
  );
}
