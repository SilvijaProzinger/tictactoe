import "./App.css";
import WelcomeScreen from "./components/WelcomeScreen";
import { useAuth } from "./context/authContext";

function App() {
  const { user } = useAuth();

  return <>{user ? <p>logged</p> : <WelcomeScreen />}</>;
}

export default App;
