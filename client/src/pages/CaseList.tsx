/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import AuthScreen from "./AuthScreen";
import { getAuth, User } from "firebase/auth";
import http from "../utils/axios";
import { Link } from "react-router-dom";
import { Api_ENdpoints } from "../config/Api_Endpoints";
import { URL } from "../config/routes";
import { MedicalCaseResponse } from "../interfaces";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [cases, setCases] = useState<MedicalCaseResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    setIsLoading(true);
    // onAuthStateChanged is a listener that is triggered when the user's sign-in state changes.
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        http
          .post(Api_ENdpoints.USER_ROLE, {
            userId: user.uid,
          })
          .then((response) => {
            setUserRole(response?.data?.role ?? "patient");
            fetchCases(user.uid, response?.data?.role ?? "patient");
          });
        setIsLoading(false);
      } else {
        setCases([]);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // fetch cases function to get the cases from the server
  const fetchCases = async (userId: string, role = userRole) => {
    try {
      setIsLoading(true);
      const response = await http.post<MedicalCaseResponse[]>(
        role === "doctor"
          ? Api_ENdpoints.DOCTOR_CASES
          : Api_ENdpoints.USER_CASES,
        {
          userId,
        }
      );
      setCases(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  };

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <div className="p-5">
      <div className="flex justify-end ">
        <Link
          to={URL.CASE_CREATE}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Create Case
        </Link>
      </div>
      <div>
        <div className="relative overflow-x-auto mt-5">
          <h2 className="text-2xl font-semibold text-gray-800 my-3">
            My Cases
          </h2>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500  ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Family Member
                  </th>
                  {userRole === "doctor" && (
                    <th scope="col" className="px-6 py-3">
                      Patient Email
                    </th>
                  )}
                  <th scope="col" className="px-6 py-3">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {cases.map((caseItem) => (
                  <tr key={caseItem.id} className="bg-white border-b  ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  "
                    >
                      {caseItem.title ?? "No Title"}
                    </th>
                    <td className="px-6 py-4">{caseItem.description}</td>
                    <td className="px-6 py-4">
                      {caseItem?.familyMember
                        ? caseItem?.familyMember
                        : "My Self"}
                    </td>
                    {userRole === "doctor" && (
                      <td className="px-6 py-4">{caseItem?.user?.email}</td>
                    )}
                    <td className="px-6 py-4">
                      {new Date(
                        caseItem?.createdAt?._seconds
                      ).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={URL.CASE_DETAIL.replace(":caseId", caseItem.id)}
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        View Case Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
