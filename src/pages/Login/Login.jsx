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

const Login = () => {
  const navigate = useNavigate();

  const { logIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("login"); // type of form: login | sign up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const user = fetchUser();
    if (user) {
      navigate("/profile");
    }
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await logIn(email, password);
      navigate("/profile");
    } catch (error) {
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      await signUp(email, password);
    } catch (error) {
      setLoading(false);
      showErrorToast();
      return;
    }
    setLoading(false);
    setType("login");
    setPassword("");
    showSuccessToast();
  };

  const showSuccessToast = () => {
    toast.success("successful", {
      data: {
        title: "Success toast",
        text: "This is a success message",
      },
    });
  };

  const showErrorToast = () => {
    toast.error("Error", {
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
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
