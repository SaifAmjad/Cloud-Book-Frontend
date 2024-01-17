import React from "react";
import Notes from "./Notes";

const Home = () => {
  return (
    <div>
      {localStorage.getItem("token") === null?<div
        className={`alert alert-primary`}
        role="alert"
      >
        Please login or signup to start keeping your notes
      </div>:""}
      <Notes />
    </div>
  );
};

export default Home;
