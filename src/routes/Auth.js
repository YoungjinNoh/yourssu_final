import { fauth } from "../fbase";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const onClick = async (event) => {
    const {
      target: { name },
    } = event;

    event.preventDefault();
    try {
      if (name === "signup")
        await createUserWithEmailAndPassword(fauth, email, password);
      else if (name === "signin")
        await signInWithEmailAndPassword(fauth, email, password);
      else if (name === "guest") await signInAnonymously(fauth);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card px-5 py-5" id="form1">
              <h1 className="text-center mb-4">Youngjin's Portfolio</h1>
              <div className="form-data">
                <div className="forms-inputs mb-4 text-center"> <span>Email</span> <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={onChange}
                />
                </div>
                <div className="forms-inputs mb-4 text-center"> <span>Password</span> <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={onChange}
                />
                </div>
                <div className="mb-3">
                  <input type="button" value="회원가입" name="signup" className="btn btn-dark w-100" onClick={onClick} />
                </div>
                <div className="mb-3">

                  <input type="button" value="로그인" name="signin" className="btn btn-dark w-100" onClick={onClick} />
                </div>
                <div className="mb-3">

                  <input
                    type="button"
                    value="Guest로 접속"
                    name="guest"
                    onClick={onClick}
                    className="btn btn-dark w-100"
                  />
                </div>

                {error && <span>{error}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>



      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright © Youngjin's Portfolio 2022
          </p>
        </div>
      </footer>
    </>
  );
};

export default Auth;
