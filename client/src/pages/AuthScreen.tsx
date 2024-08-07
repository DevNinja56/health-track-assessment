import React, { useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import http from "../utils/axios";
import { useHistory } from "react-router-dom";
import { Api_ENdpoints } from "../config/Api_Endpoints";
import { URL } from "../config/routes";
import Toggle from "../components/Toggle";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const history = useHistory();
  const auth = getAuth();

  useEffect(() => {
    // onAuthStateChanged is a listener that is triggered when the user's sign-in state changes.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        history.push(URL.CASE_LIST);
      }
    });

    return () => unsubscribe();
  }, [auth, history]);

  // handle login function
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        // Optionally, store the user role in Fire store
        http.post(Api_ENdpoints.ASSIGN_ROLE, {
          userId: user.uid,
          email: user.email,
          role: isDoctor ? "doctor" : "patient",
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {isRegister ? "Register" : "Login"}
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-2 w-full"
            />
          </div>
          {isRegister && (
            <div className="flex justify-end p-2">
              <Toggle
                label={!isDoctor ? "I am a patient" : "I am a doctor"}
                isChecked={isDoctor}
                onChangeValue={setIsDoctor}
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="mt-4 text-blue-500"
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
};

export default Login;
