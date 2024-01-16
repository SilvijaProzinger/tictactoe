import ReactDOM from "react-dom";
import styles from "../styles/Modal.module.css";
import closeIconUrl from '../assets/icons8-close.svg';

type Params = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: Params) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal__overlay} onClick={onClose}>
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button onClick={onClose} className={styles.modal__close}>
          <img src={closeIconUrl} alt="" width={24} height={24} />
        </button>
      </div>
    </div>,
    document.getElementById("modal-root") ?? document.body
  );
};

export default Modal;
