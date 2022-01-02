import React from "react";
import { Navigate, Route } from "react-router-dom";

function conditionalRoute(Component, redirectUrl, condition, path) {
  return (
    <>
      {!condition ? (
        <Route path={path} element={<Navigate to={redirectUrl} />}></Route>
      ) : (
        <Route path={path} element={<Component />}></Route>
      )}
    </>
  );
}

export default conditionalRoute;
