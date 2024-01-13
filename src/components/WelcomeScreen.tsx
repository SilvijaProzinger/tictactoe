import stylesWelcomeScreen from '../styles/WelcomeScreen.module.css'
import stylesButtons from '../styles/Buttons.module.css'

function WelcomeScreen() {
  return (
  <div className={stylesWelcomeScreen.container}>
    <div>
        <h1 className={stylesWelcomeScreen.title}>TicTacToe</h1>
        <p className={stylesWelcomeScreen.subtitle}>Welcome! Please register or login to continue</p>
    </div>
    <div className={stylesWelcomeScreen.buttons__container}>
        <button className={stylesButtons.secondary}>Register</button>
        <button className={stylesButtons.primary}>Login</button>
    </div>
  </div>
  )
}

export default WelcomeScreen;
