import { useState } from "react";
import stylesWelcomeScreen from "../styles/WelcomeScreen.module.css";
import stylesButtons from "../styles/Buttons.module.css";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Modal from "./Modal";

function WelcomeScreen() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeModal, setActiveModal] = useState('')

  const openRegisterModal = () => {
    setIsRegisterOpen(true);
    setActiveModal('register')
  };

  const openLoginModal = () => {
    setIsLoginOpen(true);
    setActiveModal('login')
  };

  const onCloseModal = () => {
    if (activeModal === 'register') setIsRegisterOpen(false)
    else setIsLoginOpen(false)
  }

  return (
    <>
      <div className={stylesWelcomeScreen.container}>
        <div>
          <h1 className={stylesWelcomeScreen.title}>TicTacToe</h1>
          <p className={stylesWelcomeScreen.subtitle}>
            Welcome! Please register or login to continue.
          </p>
        </div>
        <div className={stylesWelcomeScreen.buttons__container}>
          <button
            className={stylesButtons.outline}
            onClick={openRegisterModal}
          >
            Register
          </button>
          <button className={stylesButtons.primary} onClick={openLoginModal}>
            Login
          </button>
        </div>
      </div>
      <Modal isOpen={isRegisterOpen || isLoginOpen} onClose={onCloseModal}>
        {isRegisterOpen && <RegisterForm />} {isLoginOpen && <LoginForm />}
      </Modal>
    </>
  );
}

export default WelcomeScreen;
