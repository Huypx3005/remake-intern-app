import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Profile.module.css";

import { useAuth } from "../../contexts/authContext";

import Loading from "../../components/Loading/Loading";
import QuillEditor from "../../components/QuillEditor/QuillEditor";
import Button from "../../components/Button/Button";

import ProfilePicture from "./ProfilePicture";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");

  const { logOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await logOut();
      // Handle successful sign-out, e.g., redirect or update UI
      setIsLoading(true);
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      // Handle sign-out error, e.g., display an error message
      console.error("Sign-out error:", error.message);
    }
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
