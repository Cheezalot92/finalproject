import React, { useEffect } from "react";
import useLogout from "./useLogout";

const Logout = () => {
  const { isLoading, logout } = useLogout();

  useEffect(() => {
    logout();
  }, []);

  if (isLoading) {
    return (<div>Logging out...</div>);
  } else {
    return (
      <div>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
        <a href="/login">Login</a>
      </div>
    );
  }
};

export default Logout;