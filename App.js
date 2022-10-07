import { StatusBar } from "expo-status-bar";
import AuthenticationStack from "./stack/AuthenticationStack";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <>
      <AuthProvider>
        <AuthenticationStack />
        <StatusBar style="auto" />
      </AuthProvider>
    </>
  );
}
