import "./App.css";
import WelcomeScreen from "./components/WelcomeScreen";
import GameContainer from "./components/GameContainer";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return <>{ user ? <GameContainer /> : <WelcomeScreen /> }</>;
}

export default App;
