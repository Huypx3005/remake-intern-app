import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Profile.module.css";

import Loading from "../../components/Loading/Loading";
import QuillEditor from "../../components/QuillEditor/QuillEditor";
import Button from "../../components/Button/Button";

import ProfilePicture from "./ProfilePicture";
import { logOut } from "../../features/auth/authSlice";

import {
  checkDescIsExist,
  getDescription,
  updateDescription,
  addDescription,
} from "../../firebase/firestore/description";

import { showSuccessToast, showErrorToast } from "../../utils/showToasts";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  // const { logOut, user } = useAuth();

  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (await checkDescIsExist(user.uid)) {
          setLoading(true);
          const description = await getDescription(user.uid);
          setDescription(description.content);
        } else {
          await addDescription(user.uid);
        }
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await dispatch(logOut()).unwrap();
      showSuccessToast("Sign out successfully");
      // Handle successful sign-out, e.g., redirect or update UI
      navigate("/login");
    } catch (error) {
      setLoading(false);
      // Handle sign-out error, e.g., display an error message
      showErrorToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateDescription(user.uid, description);
      // Handle successful sign-out, e.g., redirect or update UI
      showSuccessToast("Save Success");
    } catch (error) {
      setLoading(false);
      // Handle sign-out error, e.g., display an error message
      showErrorToast(error.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["profile-container"]}>
      {loading && <Loading />}
      <div className={styles["profile-header"]}>
        <h2>Welcome, {user && user.email}!</h2>
        <Link to="/admin">
          <Button size="small">Admin</Button>
        </Link>
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
