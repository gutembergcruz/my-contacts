"use client";
import { useState } from "react";
import Styles from "./contactItem.module.scss";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";

interface ContactItemProps {
    name: string;
    cpf: string;
}
export default function ContactItem({ name, cpf }: ContactItemProps) {
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
            <button>Editar</button>
            <button>Excluir</button>
          </div>
        )}
      </div>
    </article>
  );
}
