import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Profile.module.css";

import { useAuth } from "../../contexts/authContext";

import Loading from "../../components/Loading/Loading";
import QuillEditor from "../../components/QuillEditor/QuillEditor";
import Button from "../../components/Button/Button";

import ProfilePicture from "./ProfilePicture";

import { fetchUser } from "../../utils/fetchUser";

const Profile = () => {
  let user = {};

  const [isLoading, setIsLoading] = useState(false);
  const { logOut, updateUserProfile } = useAuth();
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    user = fetchUser();
    setDescription(user?.displayName);
  }, []);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await logOut();
      // Handle successful sign-out, e.g., redirect or update UI
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      // Handle sign-out error, e.g., display an error message
      console.error("Sign-out error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await updateUserProfile(description);
      // Handle successful sign-out, e.g., redirect or update UI
    } catch (error) {
      setIsLoading(false);
      // Handle sign-out error, e.g., display an error message
      console.error("Sign-out error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles["profile-container"]}>
      {isLoading && <Loading />}
      <div className={styles["profile-header"]}>
        <h2>Welcome, {user?.email}!</h2>
        <Button onClick={handleSignOut} size="small">
          Sign Out
        </Button>
      </div>

      <div className={styles["profile-content"]}>
        {/* Add more profile content here */}
        <ProfilePicture />
        <div className={styles["editor"]}>
          <QuillEditor value={description} onChange={handleDescriptionChange} />
          <div className={styles["preview"]}>
            <h3>Description Preview</h3>
            <div
              className={styles["preview-value"]}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
          <Button size="very-small" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
