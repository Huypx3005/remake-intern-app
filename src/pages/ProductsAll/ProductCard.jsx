import styles from "./ProductCard.module.css";

const ProductCard = ({ product, index }) => {
	return (
		<div className={styles["product-card"]} key={product.id}>
			<img
				src={`assets/images/products/product-detail-${index + 1}.png`}
				alt=""
				className={styles["image"]}
			/>
			<div className={styles["text"]}>
				<div className={styles["name"]}>{product.name}</div>
				<div className={styles["description"]}>{product.description}</div>
				<div className={styles["price"]}>${product.price}</div>
			</div>
		</div>
	);
};

export default ProductCard;
