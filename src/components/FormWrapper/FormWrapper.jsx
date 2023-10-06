import styles from "./FormWrapper.module.css";

const FormWrapper = ({ children }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className={styles["form"]}>
      {children}
    </form>
  );
};

export default FormWrapper;
