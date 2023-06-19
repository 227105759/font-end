import React from "react";
import Signup from "./Signup";
import "../App.css";
import Navbar from "../Ui/Navbar";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import SignupStaff from "./SignupStaff";
import CatList from "./CatList";
import Chat from "./Chat";
import LoginGoogle from "./LoginGoogle";
import CatBackend from "./CatBackend";
import CatEdit from "./CatEdit";
import Favorite from "./Favorite";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <AuthProvider>
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />{" "}
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/update-profile"
                  element={
                    <PrivateRoute>
                      <UpdateProfile />{" "}
                    </PrivateRoute>
                  }
                ></Route>
                <Route path="/signup" Component={Signup} />
                <Route path="/signupStaff" Component={SignupStaff} />
                <Route path="/login" Component={Login} />
                <Route path="/forgot-password" Component={ForgotPassword} />
                <Route path="/catlist" Component={CatList} />
                <Route path="/chat" Component={Chat} />
                <Route path="/login-google" Component={LoginGoogle} />
                <Route path="/cat-backend" Component={CatBackend} />
                <Route path="/catEdit" Component={CatEdit} />
                <Route path="/favorite" Component={Favorite} />
              </Routes>
            </AuthProvider>
          </div>
        </Container>
      </Router>
    </>
  );
}

export default App;
