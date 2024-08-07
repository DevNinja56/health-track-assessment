import { Router } from "express";
import {
  createMedicalCase,
  getMedicalCases,
  addCaseNote,
  getSingleCase,
  addCaseDocs,
  getAllCases,
  addDoctorPrescription,
} from "../controllers/caseController";

const router = Router();

// Define the routes for the medical cases
router.post("/", createMedicalCase);
router.post("/user", getMedicalCases);
router.post("/doctor", getAllCases);
router.get("/:caseId", getSingleCase);
router.post("/:caseId/notes", addCaseNote);
router.post("/:caseId/doctor-prescription", addDoctorPrescription);
router.post("/:caseId/docs", addCaseDocs);

export default router;
