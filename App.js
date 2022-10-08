import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./context/AuthContext";
import MainStackNavigator from "./stack/AuthenticationStack";

export default function App() {
  return (
    <>
      <AuthProvider>
        <MainStackNavigator />
        <StatusBar style="auto" />
      </AuthProvider>
    </>
  );
}
