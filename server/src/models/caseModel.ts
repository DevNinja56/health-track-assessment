import { auth, db } from "../db/firebaseConfig";

export const createCase = async ({
  userId,
  description,
  familyMember,
  documents,
  title,
}: {
  userId: string;
  description: string;
  familyMember: string;
  documents: string[];
  title: string;
}) => {
  const caseRef = await db.collection("medical_cases").add({
    userId,
    title,
    description,
    familyMember,
    documents,
    createdAt: new Date(),
  });
  return caseRef.id;
};

// Get all cases for a user by userId
export const getUserCases = async (userId: string) => {
  const casesSnapshot = await db
    .collection("medical_cases")
    .where("userId", "==", userId)
    .get();
  return casesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Get all cases for an admin user
export const getAdminCases = async () => {
  const casesSnapshot = await db
    .collection("medical_cases")
    .orderBy("createdAt", "desc")
    .get();
  const cases = await Promise.all(
    casesSnapshot.docs.map(async (doc) => {
      const caseData = doc.data();
      const userId = caseData.userId;
      const userAuthRecord = await auth.getUser(userId);
      return {
        id: doc.id,
        ...caseData,
        user: userAuthRecord.toJSON(),
      };
    })
  );
  return cases;
};

//  Get a single case by caseId 
export const getCaseById = async (caseId: string) => {
  const caseSnapshot = await db.collection("medical_cases").doc(caseId).get();
  return { id: caseSnapshot.id, ...caseSnapshot.data() };
};

// Add a case history entry
export const addCaseHistory = async (historyEntry: any) => {
  await db.collection("history").add(historyEntry);
};

// Get case history by caseId
export const getCaseHistory = async (caseId: string) => {
  const historySnapshot = await db
    .collection("history")
    .where("caseId", "==", caseId)
    .get();
  return historySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Get case notes by caseId 
export const getCaseNotes = async (caseId: string) => {
  const notesSnapshot = await db
    .collection("notes")
    .where("caseId", "==", caseId)
    .get();
  return notesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Get case prescription by caseId
export const getCasePrescription = async (caseId: string) => {
  const notesSnapshot = await db
    .collection("prescription")
    .where("caseId", "==", caseId)
    .get();
  return notesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Add a document to a case by caseId
export const addNoteToCase = async (
  caseId: string,
  note: string,
  image: string
) => {
  return await db.collection("notes").add({
    note,
    image,
    createdAt: new Date(),
    caseId: caseId,
  });
};

// Add a prescription to a case by caseId 
export const addPrescriptionToCase = async (
  caseId: string,
  prescription: string,
  image: string
) => {
  return await db.collection("prescription").add({
    prescription,
    image,
    createdAt: new Date(),
    caseId: caseId,
  });
};
