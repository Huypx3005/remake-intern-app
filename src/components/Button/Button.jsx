import styles from "./Button.module.css";

const Button = ({
  type,
  variant = "primary",
  size = "medium",
  isLoading = false,
  onClick,
  children,
}) => {
  const buttonStyle = [styles["button"]];

  switch (variant) {
    case "primary":
      buttonStyle.push(styles["primary"]);
      break;
    case "success":
      buttonStyle.push(styles["success"]);
      break;
    case "danger":
      buttonStyle.push(styles["danger"]);
      break;
    default:
      break;
  }

  switch (size) {
    case "very-small":
      buttonStyle.push(styles["very-small"]);
      break;
    case "small":
      buttonStyle.push(styles["small"]);
      break;
    case "medium":
      buttonStyle.push(styles["medium"]);
      break;
    case "large":
      buttonStyle.push(styles["large"]);
      break;
    default:
      break;
  }

  isLoading && buttonStyle.push(styles["disabled"]);

  return (
    <button
      type={type}
      className={buttonStyle.join(" ")}
      onClick={onClick}
      disabled={isLoading}
    >
      {children}
    </button>
  );
};

export default Button;
