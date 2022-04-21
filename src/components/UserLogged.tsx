import React from "react";
import { useSpotifyContext } from "../main";
import { User } from "../types";
import styles from "./userLogged.module.css";

interface Props extends User {}

const UserLogged: React.FC<Props> = ({ display_name, id, images, product }) => {
  const { user } = useSpotifyContext();

  return (
    <div data-user-id={id} className={styles.headerLogged}>
      <div className={styles.user}>
        <img
          src={images[0].url}
          alt={display_name}
          style={{ width: 50, height: 50, borderRadius: 100 }}
        />
        <h4>{display_name}</h4>
        <span>{product}</span>
      </div>
      {!user.data && (
        <div>
          <button>login</button>
        </div>
      )}
    </div>
  );
};

export { UserLogged };
