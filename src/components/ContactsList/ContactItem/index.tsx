"use client";
import { useState } from "react";
import Styles from "./contactItem.module.scss";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import api from "@/services/api";

interface ContactItemProps {
    name: string;
    cpf: string;
    id: number;
    onDelete: (id: number) => void;
}
export default function ContactItem({ name, cpf, id, onDelete }: ContactItemProps) {
  const [collapsed, setCollapsed] = useState(false);

  

  return (
    <article className={Styles.container}>
      <div className={Styles.info}>
        <p>{name}</p>
        <p>CPF: {cpf}</p>
      </div>
      <div className={Styles.actions}>
        <button onClick={() => setCollapsed(!collapsed)}>
          <IoEllipsisHorizontalSharp />
        </button>
        {collapsed && (
          <div>
            <button>Ver endereço</button>
            <button onClick={() => onDelete(id)}>Excluir</button>
          </div>
        )}
      </div>
    </article>
  );
}
