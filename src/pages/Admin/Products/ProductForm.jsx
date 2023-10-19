import { useEffect, useState } from "react";



import FormWrapper from "../../../components/FormWrapper/FormWrapper";
import FormInput from "../../../components/FormInput/FormInput";
import Button from "../../../components/Button/Button";
import HorizontalLine from "../../../components/HorizontalLine/HorizontalLine";

import {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
} from "../../../firebase/firestore/products";
import Select from "../../../components/Select/Select";

const ProductForm = ({
  setIsModalOpen,
  selectedProductId,
  setData,
  setTableData,
  isLoading,
  setIsLoading,
  showSuccessToast,
  showErrorToast,
}) => {
  const [formState, setFormState] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
  });

  // gender select
  const options = [
    { label: "Category 1", value: "cat 1" },
    { label: "Category 2", value: "cat 2" },
    { label: "Category 3", value: "cat 3" },
    { label: "Category 4", value: "cat 4" },
  ];
  const [selectedOption, setSelectedOption] = useState("cat 1");
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    if (selectedProductId) {
      (async () => {
        let product;
        try {
          setIsLoading(true);
          product = await getProduct(selectedProductId);
        } catch (error) {
          setIsLoading(false);
          showErrorToast(error.message);
          return;
        }
        setSelectedOption(product?.category);
        setFormState(product);
        setIsLoading(false);
      })();
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { name, brand, description, price } = formState;

    const err = "";
    if (err) {
      showErrorToast(err);
      return;
    }

    let products;
    if (selectedProductId) {
      try {
        setIsLoading(true);
        updateProduct(
          selectedProductId,
          name,
          brand,
          description,
          price,
          selectedOption
        );
        products = await getProducts();
      } catch (error) {
        setIsLoading(false);
        showErrorToast(error.message);
        return;
      }
      setData(products);
      setTableData(products);
      setIsLoading(false);
      showSuccessToast("Update product successfully");
    } else {
      try {
        setIsLoading(true);
        await addProduct(name, brand, description, price, selectedOption);
        products = await getProducts();
      } catch (error) {
        setIsLoading(false);
        showErrorToast(error.message);
        return;
      }
      setData(products);
      setTableData(products);
      setIsLoading(false);
      showSuccessToast("Add product successfully");
    }

    // close modal
    setIsModalOpen(false);
  };

  return (
    <div>
      <FormWrapper>
        <FormInput
          type="text"
          name="name"
          value={formState.name}
          placeholder="name ..."
          autoComplete="on"
          display="block"
          onChange={handleInputChange}
        />
        <FormInput
          type="text"
          name="brand"
          value={formState.brand}
          placeholder="brand ..."
          autoComplete="on"
          display="block"
          onChange={handleInputChange}
        />
        <FormInput
          type="text"
          name="description"
          value={formState.description}
          placeholder="description ..."
          autoComplete="on"
          display="block"
          onChange={handleInputChange}
        />
        <FormInput
          type="number"
          name="price"
          value={formState.price}
          placeholder="price ..."
          display="block"
          onChange={handleInputChange}
        />
        <Select
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
        />
        <HorizontalLine width={75} />
        <Button
          type="submit"
          variant="primary"
          size="medium"
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          {selectedProductId ? "Update" : "Add"}
        </Button>
      </FormWrapper>
    </div>
  );
};

export default ProductForm;
