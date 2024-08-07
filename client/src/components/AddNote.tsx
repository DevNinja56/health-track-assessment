import React, { useState } from "react";
import http from "../utils/axios";
import { Api_ENdpoints } from "../config/Api_Endpoints";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebaseConfig";

interface propsType {
  callback?: () => void;
  cancelButton: () => void;
  caseId: string;
}

const AddNote: React.FC<propsType> = ({ callback, cancelButton, caseId }) => {
  const [image, setImage] = useState<File | null>(null);
  const [newNoteText, setNewNoteText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // handle add note function
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoaded(true);
    try {
      let imageUrl = "";
      if (image) {
        const storageRef = ref(storage, `notes/${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const response = await http.post(
        Api_ENdpoints.CASE_NOTES.replace(":caseId", caseId),
        {
          note: newNoteText,
          image: imageUrl,
        }
      );

      if (response) {
        callback?.();
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
    setIsLoaded(false);
  };

  return (
    <>
      <h3 className="text-xl font-semibold">Add Note</h3>
      <form onSubmit={handleAddNote} className="mt-4">
        <textarea
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
          placeholder="Enter note"
          className="border p-2 w-full rounded"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          className="border p-2 w-full rounded mt-2"
        />
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mt-2"
            disabled={isLoaded}
          >
            {isLoaded ? "Adding Note..." : "Add Note"}
          </button>

          <button
            type="button"
            onClick={cancelButton}
            className="
          bg-red-500 text-white p-2 rounded mt-2 inline-block
        "
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default AddNote;
