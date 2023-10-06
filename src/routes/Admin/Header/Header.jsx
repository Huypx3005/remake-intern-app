import { IoMdNotifications } from "react-icons/io";
import { RxDividerVertical } from "react-icons/rx";
import { HiMiniUserCircle } from "react-icons/hi2";
import { FaAngleDown } from "react-icons/fa";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles["header"]}>
      <div className={styles["greet"]}>
        <p className={styles["name"]}>Hello, Huy</p>
        <p className={styles["greet-nice"]}>Have a nice day</p>
      </div>
      <div className={styles["extensions"]}>
        <div className={styles["icons"]}>
          <IoMdNotifications />
          <RxDividerVertical />
          <HiMiniUserCircle />
          {/* <span className="user">
            <p className={styles["name"]}>Xuan Huy</p>
            <p className={styles["role"]}>Admin</p>
          </span> */}
          <FaAngleDown />
        </div>
      </div>
    </header>
  );
};

export default Header;
