import React, { createContext } from "react";

import Firebase from "../config/firebase";

const FirebaseContext = createContext({});

export const FirebaseProvider = FirebaseContext.Provider;

export const FirebaseConsumer = FirebaseContext.Consumer;

export const withFirebaseHOC = (Component) => (props) =>
  (
    <FirebaseConsumer>
      {(state) => <Component {...props} firebase={state} />}
    </FirebaseConsumer>
  );
