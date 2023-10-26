import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./ProductDetail.module.css";

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import Loading from "../../components/Loading/Loading";

import { getProduct } from "../../firebase/firestore/products";
import { showErrorToast } from "../../utils/showToasts";

const ProductDetail = () => {
	const { productId } = useParams();
	const [product, setProduct] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const [currentImage, setCurrentImage] = useState(
		"/assets/images/products/product-detail-1.png"
	);

	const changeImage = (newImage) => {
		setCurrentImage(newImage);
	};

	useEffect(() => {
		if (productId) {
			(async () => {
				try {
					setIsLoading(true);
					const productData = await getProduct(productId);
					setProduct(productData);
				} catch (error) {
					setIsLoading(false);
					showErrorToast(error.message);
					return;
				}
				setIsLoading(false);
			})();
		}
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
								src="/assets/svgs/products/arrow-forward.svg"
								alt="arrow-forward"
								className={styles["icon"]}
							/>
							<span className={styles["category"]}>{product.category}</span>
						</div>
						<div className={styles["product"]}>
							<div className={styles["list-images"]}>
								<img
									src="/assets/svgs/product/arrow-up.svg"
									alt=""
									className="icon"
								/>
								<img
									src="/assets/images/products/product-detail-1.png"
									alt=""
									className={styles["other-image"]}
									onClick={() =>
										changeImage("/assets/images/products/product-detail-1.png")
									}
								/>
								<img
									src="/assets/images/products/product-detail-2.png"
									alt=""
									className={styles["other-image"]}
									onClick={() =>
										changeImage("/assets/images/products/product-detail-2.png")
									}
								/>
								<img
									src="/assets/images/products/product-detail-3.png"
									alt=""
									className={styles["other-image"]}
									onClick={() =>
										changeImage("/assets/images/products/product-detail-3.png")
									}
								/>
								<img
									src="/assets/images/products/product-detail-4.png"
									alt=""
									className={styles["other-image"]}
									onClick={() =>
										changeImage("/assets/images/products/product-detail-4.png")
									}
								/>
								<img
									src="/assets/images/products/product-detail-5.png"
									alt=""
									className={styles["other-image"]}
									onClick={() =>
										changeImage("/assets/images/products/product-detail-5.png")
									}
								/>
								<img
									src="/assets/svgs/product/arrow-down.svg"
									alt=""
									className="icon"
								/>
							</div>
							<img
								className={styles["current-image"]}
								src={currentImage}
								alt=""
							/>
							<div className={styles["order"]}>
								<div className={styles["info"]}>
									<div className={styles["name"]}>{product.name}</div>
									<div className={styles["function"]}>
										Anti-aging face serum
									</div>
									<div className={styles["tags"]}>
										<div className={styles["tag"]}>all types of skin</div>
										<div className={styles["tag"]}>am or pm</div>
										<div className={styles["tag"]}>brightening</div>
									</div>
									<div className={styles["ingredients-info"]}>
										Formulated with 92% natural-origin ingredients
									</div>
									<div className={styles["price"]}>${product.price}</div>
								</div>
								<button className={styles["checkin-btn"]}>
									<img src="/assets/svgs/product/location.svg" alt="" />
									check in branches stock
								</button>
								<div className={styles["values"]}>
									<div className={styles["value"]}>
										<img src="/assets/svgs/product/giftcard.svg" alt="" />
										<span>receive 2 free samples when you spend $100</span>
									</div>
									<div className={styles["value"]}>
										<img src="/assets/svgs/product/discount.svg" alt="" />
										<span>receive $2 when you return 5 empty containers</span>
									</div>
									<div className={styles["value"]}>
										<img
											src="/assets/svgs/product/question-answer.svg"
											alt=""
										/>
										<span>receive free 1-2-1 expert advice in branches</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		</>
	);
};

export default ProductDetail;
