import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.scss";
import Nav from "./Components/Nav";
import Home from "./Components/home/MainH";
import Categories from "./Components/categories/MainC";
import Books from "./Components/books/MainB";
import LoginPage from "./Components/loging/LoginPage";
import LogoutPage from "./Components/loging/LogoutPage";
import RegisterPage from "./Components/register/MainR";
import Messages from "./Components/Messages";
import { authConfig } from "./Functions/auth";
import DataContext from "./Contexts/DataContext";

function App() {
  const [roleChange, setRoleChange] = useState(Date.now());
  //const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showLinks, setShowLinks] = useState(false);

  // useEffect(() => {
  //   axios.get("http://localhost:3003/home/users/", authConfig()).then((res) => {
  //     setCurrentUser(res.data);
  //   });
  // }, [roleChange]);

  const setMsg = useCallback((text) => {
    const message = {
      id: uuidv4(),
      text,
    };
    setMessages((prevMessages) => [...prevMessages, message]);
    setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.filter((m) => m.id !== message.id)
      );
    }, 4000);
  }, []);

  return (
    <BrowserRouter>
      <DataContext.Provider
        value={{
          messages,
          setMessages,
          setMsg,
          // currentUser,
          showLinks,
          setShowLinks,
        }}
      >
        <ShowNav roleChange={roleChange} />
        <Messages />
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth role="user">
                <Home />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/categories"
            element={
              <RequireAuth role="user">
                <Categories />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/books"
            element={
              <RequireAuth role="admin">
                <Books />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/login"
            element={<LoginPage setRoleChange={setRoleChange} />}
          />
          <Route
            path="/logout"
            element={<LogoutPage setRoleChange={setRoleChange} />}
          />
          <Route
            path="/register"
            element={<RegisterPage setRoleChange={setRoleChange} />}
          />
        </Routes>
      </DataContext.Provider>
    </BrowserRouter>
  );
}

function ShowNav({ roleChange }) {
  const [status, setStatus] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:3003/login-check?role=admin", authConfig())
      .then((res) => {
        setStatus(res.data.status);
      });
  }, [roleChange]);
  return <Nav status={status} />;
}

function RequireAuth({ children, role }) {
  const [view, setView] = useState(<h2>Please wait...</h2>);

  useEffect(() => {
    axios
      .get("http://localhost:3003/login-check?role=" + role, authConfig())
      .then((res) => {
        if ("ok" === res.data.msg) {
          setView(children);
        } else if (res.data.status === 2) {
          setView(<h2>Unauthorize...</h2>);
        } else {
          setView(<Navigate to="/login" replace />);
        }
      });
  }, [children, role]);

  return view;
}

export default App;
