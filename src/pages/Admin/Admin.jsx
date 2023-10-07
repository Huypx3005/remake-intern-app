import styles from "./Admin.module.css";

import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Users from "./Users/Users";

import Loading from "../../components/Loading/Loading";

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
            <Users />
          </div>
        </div>
      </div>
      {/* <Loading /> */}
    </main>
  );
};

export default Admin;
