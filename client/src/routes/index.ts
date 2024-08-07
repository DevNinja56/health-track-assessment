import { URL } from "../config/routes";
import CreateMedicalCase from "../pages/CreateMedicalCase";
import TrackCaseProgress from "../pages/TrackCaseProgress";
import CaseList from "../pages/CaseList";
import AuthScreen from "../pages/AuthScreen";


// Route List
export const ROUTE_LIST = [
  {
    path: URL.HOMEPAGE,
    exact: true,
    component: AuthScreen,
  },
  {
    path: URL.CASE_LIST,
    exact: true,
    component: CaseList,
  },
  {
    path: URL.CASE_DETAIL,
    exact: true,
    component: TrackCaseProgress,
  },
  {
    path: URL.CASE_CREATE,
    exact: true,
    component: CreateMedicalCase,
  },
];
