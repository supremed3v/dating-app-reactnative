import { StatusBar } from "expo-status-bar";
import AuthenticationStack from "./stack/AuthenticationStack";
import Firebase from "./config/firebase";
import { FirebaseProvider } from "./context/AuthContext";

export default function App() {
  return (
    <>
      <FirebaseProvider value={Firebase}>
        <AuthenticationStack />
        <StatusBar style="auto" />
      </FirebaseProvider>
    </>
  );
}
