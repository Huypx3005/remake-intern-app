import styles from "./Confirm.module.css";

import Button from "../../../components/Button/Button";

import { deleteUser } from "../../../firebase/firestore/users";

const ConfirmForm = ({ action = "delete", setIsModalOpen, selectedUserId }) => {
  const handleDeleteUser = () => {
    (async () => {
      deleteUser(selectedUserId);
    })();

    setIsModalOpen(false);
  };

  return (
    <div className={styles["confirm"]}>
      <p className="warning">Do you want to {action}?</p>
      <div className={styles["selections"]}>
        <Button variant="danger" size="small" onClick={handleDeleteUser}>
          Yes
        </Button>
        <Button size="small" onClick={() => setIsModalOpen(false)}>
          No
        </Button>
      </div>
    </div>
  );
};

export default ConfirmForm;
