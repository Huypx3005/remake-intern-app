import styles from "./Sidebar.module.css";

import NavItem from "./NavItem/NavItem";

import { sidebarData } from "./SidebarData";

const Sidebar = () => {
  return (
    <nav className={styles["container"]}>
      <div className={styles["logo"]}>
        <h1>Your logo</h1>
      </div>
      <div className={styles["nav-list"]}>
        {sidebarData.map((item, index) => (
          <NavItem key={index} data={item} />
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
