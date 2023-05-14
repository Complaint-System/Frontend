import Login from "./pages/Login";
import Projects from "./pages/Projects";
import Tickets from "./pages/Tickets";
import Profile from "./pages/Profile";
import ProtectedRoute from "./util/ProtectedRoute";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateTicket from "./pages/CreateTicket";
import CreateProject from "./pages/CreateProject";
import Ticket from "./pages/Ticket";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./pages/Dashboard";
import EditProject from "./pages/EditProject";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Projects />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/newticket" element={<CreateTicket />} />
          <Route path="/newproject" element={<CreateProject />} />
          <Route path="/project-settings" element={<EditProject />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

// const router = createBrowserRouter([
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     element: <ProtectedRoute />,
//     children: [
//       {
//         path: "/",
//         element: <Projects />,
//         loader: async () => {
//           return;
//         },
//       },
//       {
//         path: "projects",
//         element: <Projects />,
//       },
//       {
//         path: "tickets",
//         element: <Tickets />,
//       },
//       {
//         path: "me",
//         element: <Profile />,
//       },
//       {
//         path: "user/:userId",
//         element: <UserProfile />,
//       },
//       {
//         path: "newticket",
//         element: <CreateTicket />,
//       },
//       {
//         path: "newproject",
//         element: <CreateProject />,
//       },
//       {
//         path: "project-settings",
//         element: <EditProject />,
//       },
//       {
//         path: "ticket",
//         element: <Ticket />,
//       },
//       {
//         path: "dashboard",
//         element: <Dashboard />,
//       },
//     ],
//   },
// ]);
