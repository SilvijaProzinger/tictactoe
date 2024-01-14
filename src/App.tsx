import "./App.css";
import WelcomeScreen from "./components/WelcomeScreen";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return <>{ user ? <p>logged</p> : <WelcomeScreen /> }</>;
}

export default App;
