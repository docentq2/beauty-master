import Router from "next/router";
import firebase from "firebase/app";
import "firebase/auth";

import initFirebase from "../services/firebase";
import { useState } from "react";
initFirebase();

const provider = new firebase.auth.GoogleAuthProvider();

export default function Join() {
  const [authorizing, setAuthorizing] = useState(false);

  const handleAuth = async () => {
    setAuthorizing(true);

    try {
      const res = await firebase.auth().signInWithPopup(provider);

      const { user, credentials } = res;

      console.log({ user, credentials });

      if (!user) {
        throw new Error("пользователя нет");
      }

      // await Router.push("/");
    } catch (err) {}

    setAuthorizing(false);
  };
  return (
    <>
      <h1>Регистрация</h1>

      {authorizing ? "подождите" : <button onClick={handleAuth}>Начать</button>}
    </>
  );
}
