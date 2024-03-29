import propTypes from "prop-types";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRequestedUrl,
  setRequestedUrl,
} from "../../features/home/homeSlice";

function ConditionalRoute({ redirectUrl, condition }) {
  const location = useLocation();
  const requestedUrl = useSelector(selectRequestedUrl);
  const dispatch = useDispatch();
  if (requestedUrl === "") {
    dispatch(setRequestedUrl(location.pathname));
  }
  return <>{!condition ? <Navigate to={redirectUrl} /> : <Outlet />}</>;
}

export default ConditionalRoute;

ConditionalRoute.propTypes = {
  redirectUrl: propTypes.string.isRequired,
  condition: propTypes.bool.isRequired,
};
