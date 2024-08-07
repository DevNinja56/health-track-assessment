import { Request, Response } from "express";
import {
  createCase,
  getUserCases,
  addNoteToCase,
  addCaseHistory,
  getCaseById,
  getCaseHistory,
  getCaseNotes,
  getAdminCases,
  addPrescriptionToCase,
  getCasePrescription,
} from "../models/caseModel";
import { db } from "../db/firebaseConfig";

// Create a new medical case 
export const createMedicalCase = async (req: Request, res: Response) => {
  const { userId, description, documents, familyMember, title } = req.body;
  try {
    const caseId = await createCase({
      userId,
      description,
      documents,
      familyMember,
      title,
    });

    // Add dummy data to the case history
    const historyEntry = {
      caseId: caseId,
      action: "Case Created",
      description: "Medical case was created",
      timestamp: new Date(),
    };

    await addCaseHistory(historyEntry);

    res.status(201).send({
      success: true,
      message: "Medical case created successfully",
      data: { id: caseId },
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Error creating medical case",
      error: error.message,
    });
  }
};

// Get all medical cases for a user
export const getMedicalCases = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const cases = await getUserCases(userId);
    res.status(200).send({ success: true, data: cases });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Error fetching medical cases",
      error: error.message,
    });
  }
};

// Get all medical cases for an admin
export const getAllCases = async (req: Request, res: Response) => {
  try {
    const cases = await getAdminCases();
    res.status(200).send({ success: true, data: cases });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Error fetching medical cases",
      error: error.message,
    });
  }
};

// Get a single medical case by ID
export const getSingleCase = async (req: Request, res: Response) => {
  const { caseId } = req.params;
  try {
    const response = await getCaseById(caseId);
    const history = await getCaseHistory(caseId);
    const notes = await getCaseNotes(caseId);
    const prescription = await getCasePrescription(caseId);
    res.status(200).send({
      success: true,
      data: {
        ...response,
        history: history ?? [],
        notes: notes ?? [],
        prescription: prescription ?? [],
      },
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Error fetching medical cases",
      error: error.message,
    });
  }
};

// Add a note to a medical case
export const addCaseNote = async (req: Request, res: Response) => {
  const { caseId } = req.params;
  const { note, image } = req.body;
  try {
    const noteId = await addNoteToCase(caseId, note, image);
    res.status(201).send({
      success: true,
      message: "Note added successfully",
      data: { id: noteId },
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Error adding note",
      error: error.message,
    });
  }
};

// Add a case history entry
export const addDoctorPrescription = async (req: Request, res: Response) => {
  const { caseId } = req.params;
  const { prescription, image } = req.body;
  try {
    const prescriptionId = await addPrescriptionToCase(
      caseId,
      prescription,
      image
    );
    res.status(201).send({
      success: true,
      message: "prescription added successfully",
      data: { id: prescriptionId },
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Error adding prescription",
      error: error.message,
    });
  }
};

// Add a case history entry
export const addCaseDocs = async (req: Request, res: Response) => {
  const { caseId } = req.params;
  const { document } = req.body;
  try {
    const caseRef = db.collection("medical_cases").doc(caseId);
    const caseSnap = await caseRef.get();
    if (!caseSnap.exists) {
      throw new Error("Case not found");
    }
    await caseRef.update({
      documents: [...caseSnap.data()?.documents, document],
    });
    res.status(201).send({
      success: true,
      message: "Documents added successfully",
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Error adding note",
      error: error.message,
    });
  }
};
