import { useEffect } from "react";

// Formik
import { useFormik } from "formik";
import * as Yup from "yup";

import FormWrapper from "../../../components/FormWrapper/FormWrapper";
import FormInput from "../../../components/FormInput/FormInput";
import Button from "../../../components/Button/Button";
import HorizontalLine from "../../../components/HorizontalLine/HorizontalLine";
import Select from "../../../components/Select/Select";

import {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
} from "../../../firebase/firestore/products";

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
  // gender select
  const options = [
    { label: "Select a category", value: "" },
    { label: "Category 1", value: "cat 1" },
    { label: "Category 2", value: "cat 2" },
    { label: "Category 3", value: "cat 3" },
    { label: "Category 4", value: "cat 4" },
  ];

  const handleSubmit = async () => {
    const { name, brand, description, price, category } = formik.values;

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
          category
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
        await addProduct(name, brand, description, price, category);
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

  // Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      brand: "",
      description: "",
      price: "",
      category: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      brand: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      price: Yup.string().required("Required"),
      category: Yup.string().required("Required"),
    }),
    onSubmit: handleSubmit,
  });

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
        formik.setValues({ ...product });
        setIsLoading(false);
      })();
    }
  }, []);

  return (
    <div>
      <FormWrapper>
        <FormInput
          type="text"
          name="name"
          placeholder="name ..."
          autoComplete="on"
          display="block"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
        <FormInput
          type="text"
          name="brand"
          placeholder="brand ..."
          autoComplete="on"
          display="block"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.brand}
        />
        {formik.touched.brand && formik.errors.brand ? (
          <div>{formik.errors.brand}</div>
        ) : null}
        <FormInput
          type="text"
          name="description"
          placeholder="description ..."
          autoComplete="on"
          display="block"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        <FormInput
          type="number"
          name="price"
          placeholder="price ..."
          display="block"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />
        {formik.touched.price && formik.errors.price ? (
          <div>{formik.errors.price}</div>
        ) : null}
        <Select
          name="category"
          options={options}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.category}
        />
        {formik.touched.category && formik.errors.category ? (
          <div>{formik.errors.category}</div>
        ) : null}
        <HorizontalLine width={75} />
        <Button
          type="submit"
          variant="primary"
          size="medium"
          onClick={formik.handleSubmit}
          isLoading={isLoading}
        >
          {selectedProductId ? "Update" : "Add"}
        </Button>
      </FormWrapper>
    </div>
  );
};

export default ProductForm;
