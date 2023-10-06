import { Link } from "react-router-dom";

import styles from "./NavItem.module.css";

const NavItem = ({ data }) => {
  return (
    <div>
      <Link to={data.path} className={styles["nav-item"]}>
        <span className={styles["nav-icon"]}>{data.icon}</span>
        <span className={styles["nav-title"]}>{data.title}</span>
      </Link>
    </div>
  );
};

export default NavItem;
