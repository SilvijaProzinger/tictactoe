import stylesButton from "../styles/Buttons.module.css";
import stylesHeader from "../styles/Header.module.css";
import { useAuth } from "../context/AuthContext";
import logoutIconUrl from '../assets/icons8-logout-50.png';

function Header() {
  const { logout } = useAuth();

  return (
    <div className={stylesHeader.container}>
      <h1 className={stylesHeader.logo}>TicTacToe</h1>
      <button className={stylesButton.secondary} onClick={logout}>
        <img src={logoutIconUrl} width={20} height={20} alt=""/>
        <span>Logout</span>
      </button>
    </div>
  );
}

export default Header;
