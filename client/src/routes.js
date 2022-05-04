
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Report from "layouts/report/Report";
import Analysis from "layouts/analysis/Analysis";
import Menu from "layouts/menu/Menu";
import Details from "layouts/details/Details";
import Reasons from "layouts/Reasons/Reasons";
import Informations from "layouts/informations/Informations";
import Count from "layouts/count/Count";
import Review from "layouts/review/Review";
import Average from "layouts/average/Average";
import Vop from "layouts/vop/Vop";
import Indetail from "layouts/Indetail";
import Month from "layouts/Month/Month";
import Action from "layouts/action/Action";
import Day from "layouts/day/Day";
import Filter from "layouts/filter/Filter";

import { IoRocketSharp } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { BsCreditCardFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { IoHome } from "react-icons/io5";


const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
  },
  
  {
    type: "collapse",
    name: "Report",
    key: "Report",
    route: "/Report",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Report,
    noCollapse: true,
  },
  
  {
    type: "collapse",
    name: "Analysis",
    key: "Analysis",
    route: "/Analysis",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Analysis,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Day",
    key: "Day",
    route: "/Day",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Day,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Month",
    key: "Month",
    route: "/Month",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Month,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Details",
    key: "Details",
    route: "/Details",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Details,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Informations",
    key: "Informations",
    route: "/Informations",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Informations,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Reasons",
    key: "Reasons",
    route: "/Reasons",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Reasons,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Count",
    key: "Count",
    route: "/Count",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Count,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Review",
    key: "Review",
    route: "/Review",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Review,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Average",
    key: "Average",
    route: "/Average",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Average,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "VOP",
    key: "Vop",
    route: "/Vop",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Vop,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Indetail",
    key: "Indetail",
    route: "/Indetail",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Indetail,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Filter",
    key: "Filter",
    route: "/Filter",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Filter,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Tables,
    noCollapse: true,
  },
  
  {
    type: "collapse",
    name: "Menu",
    key: "Menu",
    route: "/Menu",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    component: Menu,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Action",
    key: "Action",
    route: "/Action",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    component: Action,
    noCollapse: true,
  },
  
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <BsFillPersonFill size="15px" color="inherit" />,
    component: Profile,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <IoIosDocument size="15px" color="inherit" />,
    component: SignIn,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <IoRocketSharp size="15px" color="inherit" />,
    component: SignUp,
    noCollapse: true,
  },
];

export default routes;
