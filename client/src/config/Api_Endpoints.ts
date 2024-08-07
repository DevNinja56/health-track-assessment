// api end points for the application
export const Api_ENdpoints = {
  CASES: "/api/cases",
  ASSIGN_ROLE: "/api/users/assignRole",
  USER_CASES: `/api/cases/user`,
  DOCTOR_CASES: `/api/cases/doctor`,
  CASE_NOTES: `/api/cases/:caseId/notes`,
  CASE_PRESCRIPTION: `/api/cases/:caseId/doctor-prescription`,
  GET_SINGLE_CASE: `/api/cases/:caseId`,
  ADD_CASE_DOC: `/api/cases/:caseId/docs`,
  USER_ROLE: `/api/users/role`,
};
