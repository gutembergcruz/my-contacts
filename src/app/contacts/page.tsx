"use client";
import ContactsList from "@/components/ContactsList";
import Styles from "./contacts.module.scss";
import { FiMenu, FiPlus } from "react-icons/fi";
import CreateItem from "@/components/ContactsList/CreateItem";
import { useState } from "react";
import { toast } from "react-toastify";
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';


// Função para fazer logout
function logout() {
  localStorage.removeItem("loggedInUser");
  toast.success('Logout efetuado com sucesso!');
  window.location.href = "/login";
}

// Função para excluir a conta
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
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

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
        <ContactsList changeMap={(e: string) => {
          const [lat, lng] = e.split(',');
          setMarkerPosition({ lat: parseFloat(lat), lng: parseFloat(lng) });
        }} />
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
        <LoadScript googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100vh' }}
            center={{ lat: markerPosition.lat, lng: markerPosition.lng }}
            zoom={15}
          >
            <Marker position={{ lat: markerPosition.lat, lng: markerPosition.lng }} />
          </GoogleMap>
        </LoadScript>
      </main>
    </section>
  );
}