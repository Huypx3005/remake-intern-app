import styles from "./Profile.module.css";

import { useAuth } from "../../contexts/authContext";

import ProfilePicture from "./ProfilePicture";

const Profile = () => {
  const { logOut, user } = useAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
      // Handle successful sign-out, e.g., redirect or update UI
      console.log("User signed out successfully.");
    } catch (error) {
      // Handle sign-out error, e.g., display an error message
      console.error("Sign-out error:", error.message);
    }
  };

  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profile-header"]}>
        <h2>Welcome, {user ? user.email : "Guest"}!</h2>
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
