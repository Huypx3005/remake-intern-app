import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext"; // Adjust the import based on your project structure
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import styles from "./ProfilePicture.module.css";

import { storage } from "../../firebase/firebase";

const ProfilePicture = () => {
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Fetch the current user's profile picture URL from Firebase Storage
    if (user) {
      let imageRef = ref(storage, `profilePictures/${user.uid}`);

      // Check if the user has a profile picture
      getDownloadURL(imageRef)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          // Handle the case where the user doesn't have a profile picture yet
          if (error.code === "storage/object-not-found") {
            console.log("User does not have a profile picture yet.");
          } else {
            console.error("Error fetching profile picture:", error.message);
          }
        });
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Upload the new profile picture to Firebase Storage
      const imageRef = ref(storage, `profilePictures/${user.uid}`);
      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrl(url);
        });
      });
    }
  };

  return (
    <div className={styles["picture"]}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Profile"
          style={{ maxWidth: "200px", borderRadius: "50%" }}
        />
      )}

      <input
        className={styles["file-input"]}
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
    </div>
  );
};

export default ProfilePicture;
