import styles from "./FormInput.module.css";

const FormInput = ({
  ref,
  type = "text",
  size = "medium",
  placeholder = "type something ...",
  autoComplete = "off",
  name,
  value,
  onChange,
  display = "inline-block",
}) => {
  const inputStyle = [styles["form-input"]];

  switch (display) {
    case "inline-block":
      inputStyle.push(styles["inline-block"]);
      break;
    case "block":
      inputStyle.push(styles["block"]);
      break;
    case "inline":
      inputStyle.push(styles["inline"]);
      break;
    default:
  }

  switch (size) {
    case "small":
      inputStyle.push(styles["small"]);
      break;
    case "medium":
      inputStyle.push(styles["medium"]);
      break;
    case "large":
      inputStyle.push(styles["large"]);
      break;
    default:
  }

  return (
    <input
      ref={ref}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className={inputStyle.join(" ")}
    />
  );
};

export default FormInput;
