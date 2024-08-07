import React, { ChangeEvent, FormEvent } from "react";
import { storage } from "../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import http from "../utils/axios";
import { User } from "firebase/auth";
import { Api_ENdpoints } from "../config/Api_Endpoints";

//  Define the NewCase interface
interface NewCase {
  description: string;
  documents: File[];
  familyMember: string;
  caseFor: "myself" | "family";
}

interface propsType {
  fetchCases: (userId: string) => void;
  user: User | null;
}

const CreateCase: React.FC<propsType> = ({ fetchCases, user }) => {
  const [newCase, setNewCase] = React.useState<NewCase>({
    description: "",
    documents: [],
    familyMember: "",
    caseFor: "myself",
  });

  // handle case change function
  const handleCaseChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewCase({ ...newCase, [e.target.name]: e.target.value });
  };

  // handle document change function
  const handleDocumentChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewCase({ ...newCase, documents: Array.from(e.target.files) });
    }
  };

  // handle submit function
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const documents = await Promise.all(
        newCase.documents.map(async (file) => {
          const storageRef = ref(storage, `documents/${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          return await getDownloadURL(snapshot.ref);
        })
      );

      await http.post(Api_ENdpoints.CASES, {
        ...newCase,
        userId: user?.uid,
        documents,
      });
      fetchCases(user!.uid);
      setNewCase({
        description: "",
        documents: [],
        familyMember: "",
        caseFor: "myself",
      });
    } catch (error) {
      console.error("Error creating case:", error);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Medical Cases</h1>
      <div className="">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={newCase.description}
              onChange={handleCaseChange}
              placeholder="Describe the medical case"
              className="border p-2 w-full rounded"
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
                placeholder="Enter family member's name"
                className="border p-2 w-full rounded"
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
              className="border p-2 w-full rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Create Case
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCase;
