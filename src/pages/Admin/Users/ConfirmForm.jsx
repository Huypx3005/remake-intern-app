import styles from "./Confirm.module.css";

import Button from "../../../components/Button/Button";

import { getUsers, deleteUser } from "../../../firebase/firestore/users";

const ConfirmForm = ({
  action = "delete",
  setIsModalOpen,
  selectedUserId,
  setData,
  setTableData,
  setIsLoading,
  showSuccessToast,
  showErrorToast,
}) => {
  const handleDeleteUser = async () => {
    let users;

    try {
      setIsLoading(true);
      deleteUser(selectedUserId);
      users = await getUsers();
    } catch (error) {
      setIsLoading(false);
      setIsModalOpen(false);
      showErrorToast();
      return;
    }
    setData(users);
    setTableData(users);
    setIsLoading(false);
    showSuccessToast();
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
