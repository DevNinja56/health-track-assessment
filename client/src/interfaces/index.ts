export interface Note {
  id: string;
  note: string;
  image: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  caseId: string;
}
export interface Prescription {
  id: string;
  prescription: string;
  image: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  caseId: string;
}

export interface MedicalCase {
  id: string;
  title: string;
  description: string;
  documents: string[];
  familyMember: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  history: HistoryEntry[];
  notes: Note[];
  prescription: Prescription[];
}

export interface HistoryEntry {
  id: string;
  caseId: string;
  action: string;
  description: string;
  timestamp: {
    _seconds: number;
    _nanoseconds: number;
  };
}

export interface NewCase {
  title: string;
  description: string;
  documents: File[];
  familyMember: string;
  caseFor: "myself" | "family";
}

export interface MedicalCaseResponse {
  id: string;
  title: string;
  description: string;
  documents: string[];
  familyMember: string;
  user?: { email: string };
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}
