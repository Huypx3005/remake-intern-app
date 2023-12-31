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
  setIsModalOpen,
  selectedUserId,
  setData,
  setTableData,
  isLoading,
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
          showErrorToast(error.message);
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
    if (selectedUserId) {
      try {
        setIsLoading(true);
        updateUser(selectedUserId, name, age, gender);
        users = await getUsers();
      } catch (error) {
        setIsLoading(false);
        showErrorToast(error.message);
        return;
      }
      setData(users);
      setTableData(users);
      setIsLoading(false);
      showSuccessToast("Update user successfully");
    } else {
      try {
        setIsLoading(true);
        await addUser(name, age, gender);
        users = await getUsers();
      } catch (error) {
        setIsLoading(false);
        showErrorToast(error.message);
        return;
      }
      setData(users);
      setTableData(users);
      setIsLoading(false);
      showSuccessToast("Add user successfully");
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
          isLoading={isLoading}
        >
          {selectedUserId ? "Update" : "Add"}
        </Button>
      </FormWrapper>
    </div>
  );
};

export default UserForm;
