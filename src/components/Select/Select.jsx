import styles from "./Select.module.css";

const Select = ({ options, value, onChange }) => {
  return (
    <select className={styles["select"]} value={value} onChange={onChange}>
      {Array.isArray(options) &&
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  );
};

export default Select;
