import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Routes, Route } from "react-router-dom";

import conditionalRoute from "./app/common/ConditionalRoute";
import {
  selectEmailVerified,
  selectIsAutheticated,
} from "./features/auth/authSlice";
import { selectHasProfileData } from "./features/Profile/profileSlice";

import "./App.css";
import LoadingSpinner from "./app/common/LoadingSpinner";
import { selectIsLoading } from "./features/home/homeSlice";
import ErrorBoundary from "./app/common/ErrorBoundary";

const Login = lazy(() => import("./features/auth/Login"));
const Home = lazy(() => import("./features/home/home"));
const VerifyEmail = lazy(() => import("./features/registration/VerifyEmail"));
const Register = lazy(() => import("./features/registration/RegisterEmail"));
const Profile = lazy(() =>
  import("./features/registration/RegisterProfileData")
);
const ResetPassword = lazy(() => import("./features/auth/ResetPassword"));

function App() {
  const isAuthenticated = useSelector(selectIsAutheticated);
  const isEmailVerified = useSelector(selectEmailVerified);
  const hasProfileData = useSelector(selectHasProfileData);
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {conditionalRoute(Login, "/home", !isAuthenticated, "/login")}

            {conditionalRoute(
              Home,
              !isAuthenticated
                ? "/login"
                : !isEmailVerified
                ? "/registration/verifyEmail"
                : "/registration/profile",
              isAuthenticated && isEmailVerified && hasProfileData,
              "/home/*"
            )}

            {conditionalRoute(
              Register,
              "/home",
              !isAuthenticated,
              "/registration/register"
            )}

            {conditionalRoute(
              VerifyEmail,
              isEmailVerified ? "/home" : "/login",
              isAuthenticated && !isEmailVerified,
              "/registration/verifyEmail"
            )}

            {conditionalRoute(
              Profile,
              "/home",
              isAuthenticated && isEmailVerified && !hasProfileData,
              "/registration/profile"
            )}

            <Route path="/resetPassword" element={<ResetPassword />}></Route>
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
