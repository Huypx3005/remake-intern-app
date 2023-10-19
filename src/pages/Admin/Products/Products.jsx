import { useEffect, useState } from "react";

import styles from "./Products.module.css";

import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import Loading from "../../../components/Loading/Loading";

import ProductForm from "./ProductForm";
import ConfirmForm from "./ConfirmForm";
import Table from "./Table";

import { getProducts } from "../../../firebase/firestore/products";
import { showErrorToast } from "../../../utils/showToasts";

const Products = () => {
  const [tableData, setTableData] = useState([]);
  const [formType, setFormType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState();
  const [selectedProductId, setSelectedProductId] = useState(null);

  // loading
  const [isLoading, setIsLoading] = useState(false);

  const tableHeaders = [
    "product ID",
    "Name",
    "Brand",
    "Description",
    "Price",
    "Category",
    "Action",
  ];
  // ----- END filter -----------

  useEffect(() => {
    (async () => {
      let products;
      try {
        setIsLoading(true);
        products = await getProducts();
        setTableData(products);
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

  const handleClickAdd = () => {
    setSelectedProductId(null);
    setFormType("add");
    setIsModalOpen(true);
  };

  const handleClickUpdate = (id) => {
    setSelectedProductId(id);
    setFormType("update");
    setIsModalOpen(true);
  };

  const handleClickDelete = (id) => {
    setSelectedProductId(id);
    setFormType("delete");
    setIsModalOpen(true);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className={styles["products-dashboard"]}>
        <h2 className={styles["dashboard-name"]}>Products</h2>
        <div className={styles["dashboard-functions"]}>
          <Button size="small" onClick={handleClickAdd} isLoading={isLoading}>
            Add product+
          </Button>
        </div>
        <div className={styles["products-table"]}>
          <Table
            headers={tableHeaders}
            data={tableData}
            handleClickUpdate={handleClickUpdate}
            handleClickDelete={handleClickDelete}
          />
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {formType === "add" || formType === "update" ? (
            <ProductForm
              setTableData={setTableData}
              type={formType}
              setIsModalOpen={setIsModalOpen}
              selectedProductId={selectedProductId}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ) : (
            <ConfirmForm
              action="delete"
              setIsModalOpen={setIsModalOpen}
              selectedProductId={selectedProductId}
              setTableData={setTableData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
        </Modal>
      </div>
    </>
  );
};

export default Products;
