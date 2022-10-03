import { StatusBar } from "expo-status-bar";
import AuthenticationStack from "./stack/AuthenticationStack";

export default function App() {
  return (
    <>
      <AuthenticationStack />
      <StatusBar style="auto" />
    </>
  );
}
