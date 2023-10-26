import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./ProductsAll.module.css";

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

import Loading from "../../components/Loading/Loading";

import { getProducts } from "../../firebase/firestore/products";
import { showErrorToast } from "../../utils/showToasts";
import ProductCard from "./ProductCard";

const chunkArray = (array, size) => {
	const chunkedArr = [];
	for (let i = 0; i < array.length; i += size) {
		chunkedArr.push(array.slice(i, i + size));
	}
	return chunkedArr;
};

const ProductsAll = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			let products;
			try {
				setIsLoading(true);
				products = await getProducts();
				setData(products);
				setIsLoading(false);
			} catch (e) {
				setIsLoading(false);
				showErrorToast(e.message);
				return;
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	return (
		<>
			{isLoading && <Loading />}
			<div className={`${styles["html"]} ${styles["body"]}`}>
				<Header />
				<main className={styles["container"]}>
					<div className={styles["content"]}>
						<div className={styles["breadcrumb"]}>
							<span className={styles["element"]}>Home</span>
							<img
								src="assets/svgs/products/arrow-forward.svg"
								alt="arrow-forward"
								className={styles["icon"]}
							/>
							<span className={styles["category"]}>Women Skincare</span>
						</div>
						<div className={styles["category-name"]}>
							<span className={styles["title"]}>Women Skincare</span>
							<span className={styles["number"]}>({data.length})</span>
						</div>
						<div className={styles["layout"]}>
							<div className={styles["filter-box"]}>
								<div className={styles["title"]}>Filter</div>
								<div className={styles["out-of-stocks"]}>
									<div className={styles["title"]}>Out Of Stocks Items</div>
									<img src="assets/svgs/products/switch.svg" alt="switch" />
								</div>
								<div className={styles["filter"]}>
									<div className={styles["filter-by"]}>
										<div className={styles["title"]}>Category</div>
										<img
											src="assets/svgs/products/arrow-drop-up.svg"
											alt="arrow-drop-up"
										/>
									</div>
									<div className={styles["list-items"]}>
										<div className={styles["item"]}>
											<img
												src="assets/svgs/products/checkbox.svg"
												alt="checkbox"
											/>
											<span className={styles["cat"]}>cleansers</span>
										</div>
										<div className={styles["item"]}>
											<img
												src="assets/svgs/products/checkbox.svg"
												alt="checkbox"
											/>
											<span className={styles["cat"]}>exfoliators</span>
										</div>
										<div className={styles["item"]}>
											<img
												src="assets/svgs/products/checkbox.svg"
												alt="checkbox"
											/>
											<span className={styles["cat"]}>toners</span>
										</div>
										<div className={styles["item"]}>
											<img
												src="assets/svgs/products/checkbox.svg"
												alt="checkbox"
											/>
											<span className={styles["cat"]}>retinols</span>
										</div>
									</div>
								</div>
								<div className={styles["filter"]}>
									<div className={styles["filter-by"]}>
										<div className={styles["title"]}>Skin Condition</div>
										<img
											src="assets/svgs/products/arrow-drop-up.svg"
											alt="arrow-drop-up"
										/>
									</div>
									<div className={styles["list-items"]}>
										<div className={styles["item"]}>
											<img
												src="assets/svgs/products/checkbox.svg"
												alt="checkbox"
											/>
											<span className={styles["cat"]}>cleansers</span>
										</div>
										<div className={styles["item"]}>
											<img
												src="assets/svgs/products/checkbox.svg"
												alt="checkbox"
											/>
											<span className={styles["cat"]}>exfoliators</span>
										</div>
										<div className={styles["item"]}>
											<img
												src="assets/svgs/products/checkbox.svg"
												alt="checkbox"
											/>
											<span className={styles["cat"]}>toners</span>
										</div>
									</div>
								</div>
								<div className={styles["filter"]}>
									<div className={styles["filter-by"]}>
										<div className={styles["title"]}>Features</div>
										<img
											src="assets/svgs/products/arrow-drop-up.svg"
											alt="arrow-drop-up"
										/>
									</div>
									<div className={styles["list-items"]}>
										<div className={styles["item"]}>
											<img
												src="assets/svgs/products/checkbox.svg"
												alt="checkbox"
											/>
											<span className={styles["cat"]}>cleansers</span>
										</div>
										<div className={styles["item"]}>
											<img
												src="assets/svgs/products/checkbox.svg"
												alt="checkbox"
											/>
											<span className={styles["cat"]}>exfoliators</span>
										</div>
									</div>
								</div>
							</div>
							<div className={styles["products"]}>
								{chunkArray(data, 3).map((row, rowIndex) => (
									<div className={styles["row"]} key={rowIndex}>
										{row.map((product, index) => (
											<Link to={`/products/${product.id}`}>
												<ProductCard product={product} index={index} />
											</Link>
										))}
										{/* Fill in with empty product cards if the row doesn't have enough products */}
										{row.length < 3 &&
											Array.from({ length: 3 - row.length }).map((_, index) => (
												<div
													className={styles["product-card"]}
													key={`empty-${index}`}
												/>
											))}
									</div>
								))}
							</div>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		</>
	);
};

export default ProductsAll;
