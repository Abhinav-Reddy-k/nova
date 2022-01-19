import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Routes, Route } from "react-router-dom";

import ConditionalRoute from "./app/common/ConditionalRoute";
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

const OnlineClass = lazy(() => import("./features/onlineClass/OnlineClass"));
const ProfileData = lazy(() => import("./features/Profile/ProfileData"));
const CodeEditor = lazy(() => import("./features/ide/CodeEditor"));
const CodingTasks = lazy(() => import("./features/ide/CodingTasks"));
const CodeAttempt = lazy(() => import("./features/ide/CodeAttempt"));
const Resources = lazy(() => import("./features/resources/Resources"));

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
            <Route
              element={
                <ConditionalRoute
                  condition={!isAuthenticated}
                  redirectUrl="/home"
                />
              }
            >
              <Route path="/login" element={<Login />} />
              <Route path="/registration/register" element={<Register />} />
            </Route>

            <Route
              element={
                <ConditionalRoute
                  condition={
                    isAuthenticated && isEmailVerified && hasProfileData
                  }
                  redirectUrl={
                    !isAuthenticated
                      ? "/login"
                      : !isEmailVerified
                      ? "/registration/verifyEmail"
                      : "/registration/profile"
                  }
                />
              }
            >
              <Route path="/home/*" element={<Home />}>
                <Route path="" element={<h1>Welcome</h1>}></Route>
                <Route path="onlineClasses" element={<OnlineClass />}></Route>
                <Route path="profile" element={<ProfileData />}></Route>
                <Route path="ide" element={<CodeEditor />}></Route>
                <Route path="test" element={<CodingTasks />}></Route>
                <Route
                  path="test/attempt/:title"
                  element={<CodeAttempt />}
                ></Route>
                <Route path="resources" element={<Resources />} />

                <Route path="*" element={<Navigate to="/home" />}></Route>
              </Route>
            </Route>

            <Route
              element={
                <ConditionalRoute
                  condition={isAuthenticated && !isEmailVerified}
                  redirectUrl={isEmailVerified ? "/home" : "/login"}
                />
              }
            >
              <Route
                path="/registration/verifyEmail"
                element={<VerifyEmail />}
              />
            </Route>

            <Route
              element={
                <ConditionalRoute
                  condition={
                    isAuthenticated && isEmailVerified && !hasProfileData
                  }
                  redirectUrl="/home"
                />
              }
            >
              <Route path="/registration/profile" element={<Profile />} />
            </Route>

            <Route path="/resetPassword" element={<ResetPassword />}></Route>
            <Route path="/*" element={<Navigate to="/home" />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
