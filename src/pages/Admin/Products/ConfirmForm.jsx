import styles from "./ConfirmForm.module.css";

import Button from "../../../components/Button/Button";

import {
  getProducts,
  deleteProduct,
} from "../../../firebase/firestore/products";

import { showSuccessToast, showErrorToast } from "../../../utils/showToasts";

const ConfirmForm = ({
  action = "delete",
  setIsModalOpen,
  selectedProductId,
  setTableData,
  isLoading,
  setIsLoading,
}) => {
  const handleDeleteProduct = async () => {
    let products;

    try {
      setIsLoading(true);
      deleteProduct(selectedProductId);
      products = await getProducts();
      setTableData(products);
      setIsLoading(false);
      showSuccessToast("Delete product successfully");
      setIsModalOpen(false);
    } catch (error) {
      setIsLoading(false);
      setIsModalOpen(false);
      showErrorToast(error.message);
      return;
    }
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
