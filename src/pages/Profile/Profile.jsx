import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Profile.module.css";

import { useAuth } from "../../contexts/authContext";

import ProfilePicture from "./ProfilePicture";
import Loading from "../../components/Loading/Loading";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { logOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await logOut();
      // Handle successful sign-out, e.g., redirect or update UI
      setIsLoading(true);
      console.log("User signed out successfully.");
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      // Handle sign-out error, e.g., display an error message
      console.error("Sign-out error:", error.message);
    }
  };

  return (
    <div className={styles["profile-container"]}>
      {isLoading && <Loading />}
      <div className={styles["profile-header"]}>
        <h2>Welcome, {user?.email}!</h2>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>

      <div className={styles["profile-content"]}>
        {/* Add more profile content here */}
        <ProfilePicture />
      </div>
    </div>
  );
};

export default Profile;
