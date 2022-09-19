import "./App.css";
import React from "react";
import Routes from "./Routes";
import { UserProvider } from "./Auth/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <Routes />
      </UserProvider>
    </>
  );
}

export default App;
