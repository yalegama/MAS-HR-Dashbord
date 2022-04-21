
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
