import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { IoMdNotifications } from "react-icons/io";
import { RxDividerVertical } from "react-icons/rx";
import { HiMiniUserCircle } from "react-icons/hi2";
import { FaAngleDown } from "react-icons/fa";

import styles from "./Header.module.css";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className={styles["header"]}>
      <div className={styles["greet"]}>
        <p className={styles["name"]}>Hello, {user && user.email}</p>
        <p className={styles["greet-nice"]}>Have a nice day</p>
      </div>
      <div className={styles["extensions"]}>
        <div className={styles["icons"]}>
          <IoMdNotifications />
          <RxDividerVertical />
          <Link to="/profile">
            <HiMiniUserCircle />
          </Link>
          <FaAngleDown />
        </div>
      </div>
    </header>
  );
};

export default Header;
