import stylesButton from "../styles/Buttons.module.css";
import stylesHeader from "../styles/Header.module.css";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { logout } = useAuth();

  return (
    <div className={stylesHeader.container}>
      <h1 className={stylesHeader.logo}>TicTacToe</h1>
      <button className={stylesButton.secondary} onClick={logout}>
        <img src={'../assets/icons8-logout-50.png'} width={24} height={24} alt=""/>
        <span>Logout</span>
      </button>
    </div>
  );
}

export default Header;
