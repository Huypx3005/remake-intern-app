import styles from "./Confirm.module.css";

import Button from "../../../components/Button/Button";

import {
  getProducts,
  deleteProduct,
} from "../../../firebase/firestore/products";

const ConfirmForm = ({
  action = "delete",
  setIsModalOpen,
  selectedProductId,
  setData,
  setTableData,
  isLoading,
  setIsLoading,
  showSuccessToast,
  showErrorToast,
}) => {
  const handleDeleteProduct = async () => {
    let products;

    try {
      setIsLoading(true);
      deleteProduct(selectedProductId);
      products = await getProducts();
    } catch (error) {
      setIsLoading(false);
      setIsModalOpen(false);
      showErrorToast(error.message);
      return;
    }
    setData(products);
    setTableData(products);
    setIsLoading(false);
    showSuccessToast("Delete product successfully");
    setIsModalOpen(false);
  };

  return (
    <div className={styles["confirm"]}>
      <p className="warning">Do you want to {action}?</p>
      <div className={styles["selections"]}>
        <Button
          variant="danger"
          size="small"
          onClick={handleDeleteProduct}
          isLoading={isLoading}
        >
          Yes
        </Button>
        <Button
          size="small"
          onClick={() => setIsModalOpen(false)}
          isLoading={isLoading}
        >
          No
        </Button>
      </div>
    </div>
  );
};

export default ConfirmForm;
