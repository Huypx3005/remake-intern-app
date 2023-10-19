import { Outlet } from "react-router-dom";

import styles from "./Admin.module.css";

import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";

const Admin = () => {
  return (
    <main className={styles["container"]}>
      <div className={styles["sidebar"]}>
        <Sidebar />
      </div>
      <div className={styles["content-container"]}>
        <div className={styles["content"]}>
          <div className={styles["header"]}>
            <Header />
          </div>
          <div className={styles["section"]}>
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Admin;
