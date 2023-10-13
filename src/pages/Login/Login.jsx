import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Login.module.css";

import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import HorizontalLine from "../../components/HorizontalLine/HorizontalLine";
import Loading from "../../components/Loading/Loading";

import { useAuth } from "../../contexts/authContext";

import { fetchUser } from "../../utils/fetchUser";
import {
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
} from "../../utils/validators";

const Login = () => {
  const navigate = useNavigate();

  const { logIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("login"); // type of form: login | sign up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const user = fetchUser();
    if (user) {
      navigate("/profile");
    }
  }, []);

  const validate = (email, password) => {
    let err = "";
    const emailVal = emailValidator(email);
    const passwordVal = passwordValidator(password);

    if (emailVal) {
      err += emailVal;
    }

    if (passwordVal) {
      err ? (err += ` - ${passwordVal}`) : (err += passwordVal);
    }

    return err;
  };

  const handleLogin = async () => {
    const err = validate(email, password);
    if (err) {
      showErrorToast(err);
      return;
    }

    try {
      setLoading(true);
      await logIn(email, password);
      navigate("/profile");
    } catch (error) {
      setLoading(false);
      showErrorToast(error.message);
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    let err = validate(email, password);
    err += confirmPasswordValidator(confirmPassword, password);
    if (err) {
      showErrorToast(err);
      return;
    }

    try {
      setLoading(true);
      await signUp(email, password);
    } catch (error) {
      setLoading(false);
      showErrorToast(error.message);
      return;
    }
    setLoading(false);
    setType("login");
    setPassword("");
    showSuccessToast("Sign up Success");
  };

  const showSuccessToast = (message) => {
    toast.success(message || "successful", {
      data: {
        title: "Success toast",
        text: "This is a success message",
      },
    });
  };

  const showErrorToast = (message) => {
    toast.error(message || "Error", {
      data: {
        title: "Error toast",
        text: "This is an error message",
      },
    });
  };
  return (
    <div className={styles["container"]}>
      {loading && <Loading />}
      <div className={styles["form"]}>
        <FormWrapper>
          <FormInput
            type="email"
            name="name"
            value={email}
            placeholder="example@email.com"
            autoComplete="on"
            display="block"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="password"
            display="block"
            onChange={(e) => setPassword(e.target.value)}
          />
          {type === "signup" ? (
            <FormInput
              type="password"
              name="password"
              value={confirmPassword}
              placeholder="confirm password"
              display="block"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          ) : null}
          <HorizontalLine width={75} />

          {type === "login" ? (
            <div>
              <Button
                type="submit"
                variant="primary"
                size="medium"
                onClick={handleLogin}
                isLoading={loading}
              >
                Log in
              </Button>
              <p className={styles["no-account"]}>
                Not a member?{" "}
                <Button
                  variant="success"
                  size="very-small"
                  onClick={() => {
                    setType("signup");
                    setEmail("");
                    setPassword("");
                  }}
                  isLoading={loading}
                >
                  Sign up
                </Button>
              </p>
            </div>
          ) : (
            <div>
              <Button
                type="submit"
                variant="success"
                size="medium"
                onClick={handleSignUp}
                isLoading={loading}
              >
                Sign up
              </Button>
              <p className={styles["no-account"]}>
                Already have an account?{" "}
                <Button
                  size="very-small"
                  onClick={() => {
                    setType("login");
                    setEmail("");
                    setPassword("");
                  }}
                  isLoading={loading}
                >
                  Log in
                </Button>
              </p>
            </div>
          )}
        </FormWrapper>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
