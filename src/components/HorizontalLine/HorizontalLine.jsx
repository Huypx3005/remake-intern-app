import styles from "./HorizontalLine.module.css";

const HorizontalLine = ({ width = 75 }) => {
  const lineStyle = [styles["hr"]];
  switch (width) {
    case 50:
      lineStyle.push(styles["hr-50"]);
      break;
    case 75:
      lineStyle.push(styles["hr-75"]);
      break;
    case 90:
      lineStyle.push(styles["hr-90"]);
      break;
    case 100:
      lineStyle.push(styles["hr-100"]);
      break;
    default:
      break;
  }
  return <hr className={lineStyle.join(" ")} />;
};

export default HorizontalLine;
