import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./context/AuthContext";
import MainStackNavigator from "./stack/MainStack";

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
