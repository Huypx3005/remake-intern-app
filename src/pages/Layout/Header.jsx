import { Link } from "react-router-dom";

import styles from "./Header.module.css";

const Header = () => {
	return (
		<div className={`${styles["container"]} ${styles["header"]}`}>
			<header className={styles["content"]}>
				<div className={styles["menu"]}>
					<img src="/assets/svgs/menu.svg" alt="menu" />
				</div>
				<div className={styles["mb-search-icon"]}>
					<img src="/assets/svgs/search.svg" alt="" />
				</div>
				<Link to={"/"}>
					<div className={styles["logo"]}>
						<div className={styles["beautya-logo"]}>
							<img
								src="/assets/svgs/logo/beautya-logo.svg"
								alt="beautya-logo"
							/>
						</div>
						<div className={styles["beautya"]}>
							<img src="/assets/svgs/logo/beautya.svg" alt="beautya" />
						</div>
					</div>
				</Link>
				<div className={styles["navbar-menu"]}>
					<a href="" className={styles["navbar-menu"]}>
						Women Make UP
					</a>
					<a href="" className={styles["navbar-item"]}>
						Women Skincare
					</a>
					<a href="" className={styles["navbar-item"]}>
						Gifs & Sets
					</a>
					<a href="" className={styles["navbar-item"]}>
						Branches
					</a>
					<a href="" className={styles["navbar-item"]}>
						Our Brand
					</a>
				</div>
				<div className={styles["search-and-lang"]}>
					<div className={styles["search-icon"]}>
						<div className={styles["search"]}>
							<img src="/assets/svgs/search.svg" alt="search" />
						</div>
					</div>
					<div className={styles["line-1"]}></div>
					<div className={styles["button"]}>
						<div className={styles["language"]}>
							<img src="/assets/svgs/language.svg" alt="language" />
							<span>
								US <span className={styles["lang"]}>(EN)</span>
							</span>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
};

export default Header;
