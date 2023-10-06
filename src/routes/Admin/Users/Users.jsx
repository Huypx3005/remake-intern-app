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
  const [formType, setFormType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [tableData, setTableData] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const options = [
    { label: "Name", value: "name" },
    { label: "Gender", value: "gender" },
  ];

  useEffect(() => {
    (async () => {
      const users = await getUsers();
      setData(users);
      setTableData(data);
    })();
  }, [data]);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleClickFilter = () => {
    switch (selectedOption) {
      case "name":
        setTableData(() =>
          data.filter((item) =>
            item.name.toLowerCase().includes(filterValue.toLowerCase())
          )
        );
        break;
      case "gender":
        setTableData(() =>
          data.filter((item) =>
            item.gender.toLowerCase().includes(filterValue.toLowerCase())
          )
        );
        break;
      default:
        break;
    }
    console.log(filterValue);
    console.log(tableData);
  };

  const clearFilter = () => {
    setTableData([]);
    setFilterValue("");
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
          <div className={styles["search"]}>
            <FormInput placeholder="Search" />
            <Button size="small">Search</Button>
          </div>
          <Button size="small" onClick={handleClickAdd}>
            Add user+
          </Button>
          <span className={styles["filter"]}>
            <FormInput
              // ref={filterInputRef}
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
              type={formType}
              setIsModalOpen={setIsModalOpen}
              selectedUserId={selectedUserId}
            />
          ) : (
            <ConfirmForm
              action="delete"
              setIsModalOpen={setIsModalOpen}
              selectedUserId={selectedUserId}
            />
          )}
        </Modal>
      </div>
    </>
  );
};

export default Users;
