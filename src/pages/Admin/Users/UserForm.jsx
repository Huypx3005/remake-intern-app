import { useEffect, useState } from "react";

import FormWrapper from "../../../components/FormWrapper/FormWrapper";
import FormInput from "../../../components/FormInput/FormInput";
import Button from "../../../components/Button/Button";
import HorizontalLine from "../../../components/HorizontalLine/HorizontalLine";

import {
  getUsers,
  addUser,
  getUser,
  updateUser,
} from "../../../firebase/firestore/users";

const UserForm = ({
  type,
  setIsModalOpen,
  selectedUserId,
  setData,
  setTableData,
  setIsLoading,
  showSuccessToast,
  showErrorToast,
}) => {
  const [formState, setFormState] = useState({
    name: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    if (selectedUserId) {
      (async () => {
        let user;
        try {
          setIsLoading(true);
          user = await getUser(selectedUserId);
        } catch (error) {
          setIsLoading(false);
          showErrorToast();
          return;
        }
        setFormState(user);
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
    const { name, age, gender } = formState;
    let users;
    switch (type) {
      case "add":
        try {
          setIsLoading(true);
          await addUser(name, age, gender);
          users = await getUsers();
        } catch (error) {
          setIsLoading(false);
          showErrorToast();
          return;
        }
        setData(users);
        setTableData(users);
        setIsLoading(false);
        showSuccessToast();
        break;
      case "update":
        try {
          setIsLoading(true);
          updateUser(selectedUserId, name, age, gender);
          users = await getUsers();
        } catch (error) {
          setIsLoading(false);
          showErrorToast();
          return;
        }
        setData(users);
        setTableData(users);
        setIsLoading(false);
        showSuccessToast();
        break;
      default:
        break;
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
          type="number"
          name="age"
          value={formState.age}
          placeholder="age ..."
          display="block"
          onChange={handleInputChange}
        />
        <FormInput
          type="gender"
          name="gender"
          value={formState.gender}
          placeholder="gender ..."
          display="block"
          onChange={handleInputChange}
        />
        <HorizontalLine width={75} />
        <Button
          type="submit"
          variant="primary"
          size="medium"
          onClick={handleSubmit}
        >
          {(type === "add" && "Add") || (type === "update" && "Update")}
        </Button>
      </FormWrapper>
    </div>
  );
};

export default UserForm;
