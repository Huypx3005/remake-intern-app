import { useEffect, useState } from "react";

import styles from "./Users.module.css";

import FormInput from "../../../components/FormInput/FormInput";
import Button from "../../../components/Button/Button";
import Select from "../../../components/Select/Select";
import Modal from "../../../components/Modal/Modal";

import UserForm from "./UserForm";
import ConfirmForm from "./ConfirmForm";
import Table from "./Table";

import { getUsers } from "../../../firebase/firestore/users";

const Users = () => {
  const [data, setData] = useState([]); // data get from api
  const [tableData, setTableData] = useState([]);
  const [formType, setFormType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // loading
  const [isLoading, setIsLoading] = useState(false);

  //------  for filter ----------
  const [selectedOption, setSelectedOption] = useState("name"); // name is default value of select
  const [filterValue, setFilterValue] = useState("");

  const options = [
    { label: "Name", value: "name" },
    { label: "Gender", value: "gender" },
  ];

  // ----- END filter -----------

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const users = await getUsers();
      setData(users);
      setTableData(users);
      setIsLoading(false);
    })();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleClickFilter = () => {
    setIsLoading(true);
    let filteredData = [];
    switch (selectedOption) {
      case "name":
        filteredData = data.filter((item) =>
          item.name.toLowerCase().includes(filterValue.toLowerCase())
        );
        setTableData(filteredData);
        break;
      case "gender":
        filteredData = data.filter((item) =>
          item.gender.toLowerCase().includes(filterValue.toLowerCase())
        );
        setTableData(filteredData);
        break;
      default:
        break;
    }
    setIsLoading(false);
  };

  const clearFilter = () => {
    setFilterValue("");
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
      <div className={styles["users-dashboard"]}>
        <h2 className={styles["dashboard-name"]}>User</h2>
        <div className={styles["dashboard-functions"]}>
          <Button size="small" onClick={handleClickAdd}>
            Add user+
          </Button>
          <span className={styles["filter"]}>
            <FormInput
              type="text"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
            <span>Filter by:</span>
            <Select
              options={options}
              value={selectedOption}
              onChange={handleSelectChange}
            />
            <Button size="small" onClick={handleClickFilter}>
              Filter
            </Button>
            <Button size="small" onClick={clearFilter}>
              Clear filter
            </Button>
          </span>
        </div>
        <div className={styles["users-table"]}>
          <Table
            headers={["User ID", "Name", "Age", "Gender", "Action"]}
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
            />
          ) : (
            <ConfirmForm
              action="delete"
              setIsModalOpen={setIsModalOpen}
              selectedUserId={selectedUserId}
              setData={setData}
              setTableData={setTableData}
            />
          )}
        </Modal>
      </div>
    </>
  );
};

export default Users;
