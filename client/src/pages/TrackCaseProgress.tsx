/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import http from "../utils/axios";
import { MedicalCase } from "../interfaces";
import { Api_ENdpoints } from "../config/Api_Endpoints";
import { useAuth } from "../hook/auth";
import AddDocument from "../components/AddDocument";
import AddNote from "../components/AddNote";
import AddPrescription from "../components/AddPrescription";

const TrackCaseProgress: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const [caseData, setCaseData] = useState<MedicalCase | null>(null);
  const [showNotes, setShowNotes] = useState(false);
  const [showPrescription, setShowPrescription] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const { userRole } = useAuth();

  // fetch case data function to get the case data from the server
  const fetchCaseData = async () => {
    try {
      const caseResponse = await http.get(
        Api_ENdpoints.GET_SINGLE_CASE.replace(":caseId", caseId)
      );
      if (caseResponse.data) {
        setCaseData(caseResponse.data);
      } else {
        console.error("No case found with the provided ID");
      }
    } catch (error) {
      console.error("Error fetching case data:", error);
    }
  };

  useEffect(() => {
    // fetch case data when the caseId changes
    if (caseId) {
      fetchCaseData();
    }
  }, [caseId]);

  // format timestamp function to format the timestamp
  const formatTimestamp = (timestamp: {
    _seconds: number;
    _nanoseconds: number;
  }) => {
    const date = new Date(
      timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000
    );
    return date.toLocaleString();
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Track Medical Case Progress</h2>
      {caseData ? (
        <div>
          <h3 className="text-xl font-semibold">Case Title</h3>
          <p>{caseData?.title ?? "No title"}</p>

          <h3 className="text-xl font-semibold">Case Description</h3>
          <p>{caseData.description}</p>

          <h3 className="text-xl font-semibold mt-4">Family Member</h3>
          <p>{caseData.familyMember}</p>

          <h3 className="text-xl font-semibold mt-4">Created At</h3>
          <p>{formatTimestamp(caseData.createdAt)}</p>

          <div className="relative ">
            <h3 className="text-xl font-semibold mt-4">Patient Documents</h3>
            <div className="border rounded-md p-3">
              {userRole !== "doctor" && (
                <div className="show-add-documents">
                  {showDocuments ? (
                    <AddDocument
                      callback={async () => {
                        await fetchCaseData();
                        setShowDocuments(false);
                      }}
                      cancelButton={() => setShowDocuments(false)}
                      caseId={caseId}
                    />
                  ) : (
                    <button
                      onClick={() => setShowDocuments(true)}
                      className="
                    bg-blue-500 text-white p-1 text-xs rounded inline-block  absolute top-0 right-3
                 "
                    >
                      Add Documents
                    </button>
                  )}
                </div>
              )}
              <ul className="flex gap-2 ">
                {caseData.documents.map((doc, index) => (
                  <li key={index}>
                    <a
                      href={doc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 p-2 rounded inline-block hover:bg-blue-500 hover:text-white"
                    >
                      Document {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr className="my-4" />

          <div className="relative ">
            <h3 className="text-xl font-semibold mt-4">
              Doctor Documents
            </h3>
            <div className="border rounded-md p-3">
              {userRole === "doctor" && (
                <div className="show-add-documents">
                  {showPrescription ? (
                    <AddPrescription
                      callback={async () => {
                        await fetchCaseData();
                        setShowPrescription(false);
                      }}
                      cancelButton={() => setShowPrescription(false)}
                      caseId={caseId}
                    />
                  ) : (
                    <button
                      onClick={() => setShowPrescription(true)}
                      className="
                    bg-blue-500 text-white p-1 text-xs rounded inline-block  absolute top-0 right-3
                 "
                    >
                      Add Document
                    </button>
                  )}
                </div>
              )}
              <ul>
                {caseData?.prescription.length ? (
                  caseData?.prescription.map((prescription) => (
                    <li
                      key={prescription.id}
                      className="
                    border p-4 rounded relative mt-2
                  "
                    >
                      <p>
                        <strong>{prescription.prescription}</strong>
                      </p>
                      {prescription.image && (
                        <img
                          src={prescription.image}
                          alt="prescription"
                          className="mt-2 w-14 h-auto"
                        />
                      )}
                      {/* date and time */}
                      <p>{formatTimestamp(prescription.createdAt)}</p>
                    </li>
                  ))
                ) : (
                  <>
                    <p>No prescription found for this case</p>
                  </>
                )}
              </ul>
            </div>
          </div>

          <hr className="my-4" />

          <div className="notes relative">
            <div className="show-add-notes">
              {showNotes ? (
                <AddNote
                  callback={async () => {
                    await fetchCaseData();
                    setShowNotes(false);
                  }}
                  cancelButton={() => setShowNotes(false)}
                  caseId={caseId}
                />
              ) : (
                <button
                  onClick={() => setShowNotes(true)}
                  className="
                    bg-blue-500 text-white p-1 text-xs rounded inline-block  absolute top-0 right-3
                 "
                >
                  Add Note
                </button>
              )}
            </div>
            <h3 className="text-xl font-semibold mt-4">Notes</h3>
            <ul>
              {caseData?.notes.length ? (
                caseData?.notes.map((note) => (
                  <li
                    key={note.id}
                    className="
                    border p-4 rounded relative mt-2
                  "
                  >
                    <p>
                      <strong>{note.note}</strong>
                    </p>
                    {note.image && (
                      <img
                        src={note.image}
                        alt="Note"
                        className="mt-2 w-14 h-auto"
                      />
                    )}
                    {/* date and time */}
                    <p>{formatTimestamp(note.createdAt)}</p>
                  </li>
                ))
              ) : (
                <>
                  <p>No notes found for this case</p>
                </>
              )}
            </ul>
          </div>

          <hr className="my-4" />
          <h3 className="text-xl font-semibold mt-4">History</h3>
          <ul>
            {caseData?.history?.length ? (
              caseData?.history.map((entry) => (
                <li key={entry.id}>
                  <p>
                    <strong>{entry.action}:</strong> {entry.description}
                  </p>
                  <p>{formatTimestamp(entry.timestamp)}</p>
                </li>
              ))
            ) : (
              <>
                <p>No history found for this case</p>
              </>
            )}
          </ul>
        </div>
      ) : (
        <p>Loading case data...</p>
      )}
    </div>
  );
};

export default TrackCaseProgress;
