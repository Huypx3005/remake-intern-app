import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import styles from "./ProfilePicture.module.css";

import { storage } from "../../firebase/firebase";

import { showErrorToast, showSuccessToast } from "../../utils/showToasts";

const ProfilePicture = () => {
  const { user } = useSelector((state) => state.auth);
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
            let imageRef = ref(storage, `profilePictures/avatar.png`);
            getDownloadURL(imageRef)
              .then((url) => {
                setImageUrl(url);
              })
              .catch((e) => {
                console.log(e.message);
              });
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
      try {
        const imageRef = ref(storage, `profilePictures/${user.uid}`);
        uploadBytes(imageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImageUrl(url);
            showSuccessToast("Upload Success");
          });
        });
      } catch (err) {
        showErrorToast(err.message);
        return;
      }
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
