import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";

import styles from "./Login.module.css";

import Loading from "../../components/Loading/Loading";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import HorizontalLine from "../../components/HorizontalLine/HorizontalLine";

// import { useAuth } from "../../contexts/authContext";
import { logIn, signUp } from "../../features/auth/authSlice";

import {
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
} from "../../utils/validators";
import { showSuccessToast, showErrorToast } from "../../utils/showToasts.js";

const Login = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [type, setType] = useState("login"); // type of form: login | sign up

  // input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // redirect to profile page if user is logged in
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, []);

  /**
   * Validate user input
   * @param {string} email
   * @param {string} password
   * @returns {string} err message
   */
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

  /**
   * Handle login, navigate to /profile when log in successful
   * @returns {void}
   */
  const handleLogin = async () => {
    const err = validate(email, password);
    if (err) {
      showErrorToast(err);
      return;
    } else {
      try {
        setLoading(true);
        await dispatch(logIn({ email, password })).unwrap();
        showSuccessToast("Login Success");
        navigate("/profile");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        showErrorToast(error.message);
        return;
      }
    }
  };

  /**
   * Handle sign, open Login form when sign up successfully
   * @returns {void}
   */
  const handleSignUp = async () => {
    let err = validate(email, password);
    const confirmPasswordVal = confirmPasswordValidator(
      confirmPassword,
      password
    );

    if (confirmPasswordVal) {
      err += " - " + confirmPasswordVal;
    }

    if (err) {
      showErrorToast(err);
      return;
    } else {
      try {
        setLoading(true);
        await dispatch(signUp({ email, password })).unwrap();
        setLoading(false);
        showSuccessToast("Sign up Success");
        navigate("/profile");
      } catch (error) {
        setLoading(false);
        showErrorToast(error.message);
        return;
      }
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles["container"]}>
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
                        setConfirmPassword("");
                      }}
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
                    >
                      Log in
                    </Button>
                  </p>
                </div>
              )}
            </FormWrapper>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
