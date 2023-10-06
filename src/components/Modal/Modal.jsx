import { useRef } from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef(null);

  return (
    <>
      {isOpen && (
        <>
          <div className={styles["overlay"]}>
            <dialog ref={dialogRef} open className={styles["modal"]}>
              <button className={styles["close"]} onClick={onClose}>
                &times;
              </button>
              {children}
            </dialog>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
