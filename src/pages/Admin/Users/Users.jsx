import { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";

import styles from "./Users.module.css";

import FormInput from "../../../components/FormInput/FormInput";
import Button from "../../../components/Button/Button";
import Select from "../../../components/Select/Select";
import Modal from "../../../components/Modal/Modal";
import Loading from "../../../components/Loading/Loading";

import UserForm from "./UserForm";
import ConfirmForm from "./ConfirmForm";
import Table from "./Table";

import { getUsers } from "../../../firebase/firestore/users";
import { showErrorToast } from "../../../utils/showToasts";

const Users = () => {
  const [data, setData] = useState([]); // data get from api
  const [tableData, setTableData] = useState([]);
  const [formType, setFormType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // loading
  const [isLoading, setIsLoading] = useState(false);

  //------  for filter ----------
  const [selectedGender, setSelectedGender] = useState("male"); // name is default value of select
  const [inputName, setInputName] = useState("");
  const [inputAgeFrom, setInputAgeFrom] = useState("");
  const [inputAgeTo, setInputAgeTo] = useState("");

  const tableHeaders = ["User ID", "Name", "Age", "Gender", "Action"];

  const options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Optional", value: "optional" },
    { label: "none", value: "none" },
  ];

  // ----- END filter -----------

  useEffect(() => {
    (async () => {
      let users;
      try {
        setIsLoading(true);
        users = await getUsers();
        setData(users);
        setTableData(users);
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

  const handleSelectChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleClickFilter = () => {
    setIsLoading(true);

    // Create a copy of the original data
    let filteredData = [...data];

    // Filter by name
    if (inputName) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(inputName.toLowerCase())
      );
    }

    // Filter by gender
    if (selectedGender !== "none") {
      filteredData = filteredData.filter(
        (item) => item.gender.toLowerCase() === selectedGender.toLowerCase()
      );
    }

    // Filter by age
    if (inputAgeFrom) {
      filteredData = filteredData.filter(
        (item) => Number(item.age) >= Number(inputAgeFrom)
      );
    }

    if (inputAgeTo) {
      filteredData = filteredData.filter(
        (item) => Number(item.age) <= Number(inputAgeTo)
      );
    }

    // Apply other filters as needed

    // Update the table data
    setTableData(filteredData);
    setIsLoading(false);
  };

  const clearFilter = () => {
    setInputName("");
    setInputAgeFrom("");
    setInputAgeTo("");
    setTableData(data);
  };

  const handleClickAdd = () => {
    setSelectedUserId(null);
    setFormType("add");
    setIsModalOpen(true);
  };

  const handleClickUpdate = (id) => {
    setSelectedUserId(id);
    setFormType("update");
    setIsModalOpen(true);
  };

  const handleClickDelete = (id) => {
    setSelectedUserId(id);
    setFormType("delete");
    setIsModalOpen(true);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className={styles["users-dashboard"]}>
        <h2 className={styles["dashboard-name"]}>User</h2>
        <div className={styles["dashboard-functions"]}>
          <Button size="small" onClick={handleClickAdd} isLoading={isLoading}>
            Add user+
          </Button>
          <span className={styles["filter"]}>
            <span className={styles["filter-p"]}>Filter:</span>

            <FormInput
              placeholder="name"
              size="small"
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            <Select
              options={options}
              value={selectedGender}
              onChange={handleSelectChange}
            />

            <span className={styles["age-input"]}>
              <FormInput
                type="number"
                size="small"
                value={inputAgeFrom}
                placeholder="age from"
                onChange={(e) => setInputAgeFrom(e.target.value)}
              />
              <FormInput
                size="small"
                type="number"
                value={inputAgeTo}
                placeholder=" age to"
                onChange={(e) => setInputAgeTo(e.target.value)}
              />
            </span>

            <span className={styles["filter-button"]}>
              <Button
                size="very-small"
                onClick={handleClickFilter}
                isLoading={isLoading}
              >
                Filter
              </Button>
              <Button
                size="very-small"
                onClick={clearFilter}
                isLoading={isLoading}
              >
                Clear filter
              </Button>
            </span>
          </span>
        </div>
        <div className={styles["users-table"]}>
          <Table
            headers={tableHeaders}
            data={tableData}
            handleClickUpdate={handleClickUpdate}
            handleClickDelete={handleClickDelete}
          />
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {formType === "add" || formType === "update" ? (
            <UserForm
              setData={setData}
              setTableData={setTableData}
              type={formType}
              setIsModalOpen={setIsModalOpen}
              selectedUserId={selectedUserId}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ) : (
            <ConfirmForm
              action="delete"
              setIsModalOpen={setIsModalOpen}
              selectedUserId={selectedUserId}
              setData={setData}
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

export default Users;
