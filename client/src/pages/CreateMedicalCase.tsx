import React, { useState, ChangeEvent, FormEvent } from "react";
import { storage } from "../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import http from "../utils/axios";
import { NewCase } from "../interfaces";
import { Api_ENdpoints } from "../config/Api_Endpoints";
import { URL } from "../config/routes";

const CreateMedicalCase: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newCase, setNewCase] = useState<NewCase>({
    title: "",
    description: "",
    documents: [],
    familyMember: "",
    caseFor: "myself",
  });
  const history = useHistory();
  const auth = getAuth();
  const user = auth.currentUser;

  // handle case change function to update the newCase state
  const handleCaseChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewCase({ ...newCase, [e.target.name]: e.target.value });
  };

  // handle document change function to update the newCase state
  const handleDocumentChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewCase({ ...newCase, documents: Array.from(e.target.files) });
    }
  };

  // handle submit function to create a new case
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const documents = await Promise.all(
        newCase.documents.map(async (file) => {
          const storageRef = ref(storage, `documents/${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          return await getDownloadURL(snapshot.ref);
        })
      );

      // post request to create a new case with the newCase state
      await http.post(Api_ENdpoints.CASES, {
        ...newCase,
        userId: user?.uid,
        documents,
      });
      setNewCase({
        title: "",
        description: "",
        documents: [],
        familyMember: "",
        caseFor: "myself",
      });
      history.push(URL.CASE_LIST);
    } catch (error) {
      console.error("Error creating case:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Medical Case</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            name="title"
            value={newCase.title}
            onChange={handleCaseChange}
            className="w-full border p-2 rounded"
            placeholder="Enter the title of the case"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={newCase.description}
            onChange={handleCaseChange}
            className="w-full border p-2 rounded"
            placeholder="Describe the medical case"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Case For</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="caseFor"
                value="myself"
                checked={newCase.caseFor === "myself"}
                onChange={handleCaseChange}
                className="mr-2"
              />
              Myself
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="caseFor"
                value="family"
                checked={newCase.caseFor === "family"}
                onChange={handleCaseChange}
                className="mr-2"
              />
              Family Member
            </label>
          </div>
        </div>
        {newCase.caseFor === "family" && (
          <div>
            <label className="block mb-1">Family Member Name</label>
            <input
              type="text"
              name="familyMember"
              value={newCase.familyMember}
              onChange={handleCaseChange}
              className="w-full border p-2 rounded"
              placeholder="Enter family member's name"
              required
            />
          </div>
        )}
        <div>
          <label className="block mb-1">Documents</label>
          <input
            type="file"
            multiple
            onChange={handleDocumentChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Case"}
        </button>
      </form>
    </div>
  );
};

export default CreateMedicalCase;
