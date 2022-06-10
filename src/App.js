import React, { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./style/map.css";
import ToDoLists from "./components/toDoLists/ToDoLists";
import TravelsList from "./components/travelList/TravelList";
import NavBar from "./components/navBar/NavBar";
import SideMenu from "./components/navBar/SideMenu";
import Admin from "./components/admin/Admin";
import { TravelProvider } from "./context/TravelContext";
import { UserProvider } from "./context/userContext";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import MapGl from "./mapHandler/MapGl";
import PoiInformation from "./mapHandler/PoiInformation";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Details from "./components/Details";
import StepInfo from "./mapHandler/StepInfo";
import RequireAuth from "./context/requireAuth";
import ExploreTrips from "./explore/ExploreTrips";
import ExploreRoute from "./explore/ExploreRoute";
import ExploringMapNavBar from "./components/navBar/ExploringMapNavBar";
import Album from "./album/Album";
import CheckLink from "./album/unregistered/CheckLink";

function App() {
  const [contentPage, setContentPage] = useState("map");
  const [showMenu, setShowMenu] = useState(false);
  const [poiId, setPoiId] = useState(false);
  const [stepId, setStepId] = useState(false);
  const [travelers, setTravelers] = useState([]);
  const [movingStep, setMovingStep] = useState(null);
  const [movingPoi, setMovingPoi] = useState(null);

  return (
    <BrowserRouter>
      <UserProvider>
        <TravelProvider>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/home/' element={<RequireAuth />}>
              <Route path='explore/' element={<ExploreRoute />}>
                <Route path='list' element={<ExploreTrips />} />
                <Route
                  path='map/:id'
                  element={
                    <div
                      style={{
                        width: "100%",
                        height: "93vh",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <ExploringMapNavBar />
                      <MapGl exploring={true} />
                    </div>
                  }
                />
              </Route>
              <Route path='trips' element={<TravelsList />} />
              <Route path='album/:id' element={<Album />} />
              <Route
                path='map/:id'
                element={
                  <>
                    <div
                      style={{
                        marginLeft: showMenu ? 200 : 0,
                        transition: "0.5s",
                      }}
                    >
                      <NavBar setShowMenu={setShowMenu} />
                      <div style={{ display: "flex" }}>
                        <ToDoLists display={contentPage === "toDoLists"} />
                        <Admin
                          display={contentPage === "admin"}
                          travelers={travelers}
                          setTravelers={setTravelers}
                        />
                        <PoiInformation
                          display={contentPage === "poiInfo"}
                          setContentPage={setContentPage}
                          poiId={poiId}
                          setMovingPoi={setMovingPoi}
                        />
                        <StepInfo
                          display={contentPage === "stepInfo"}
                          setContentPage={setContentPage}
                          stepId={stepId}
                          setMovingStep={setMovingStep}
                        />
                        <Details
                          display={contentPage === "details"}
                          setContentPage={setContentPage}
                        />
                        <div
                          style={{
                            flex:
                              contentPage === "map"
                                ? 1
                                : contentPage === "details" ||
                                  contentPage === "admin"
                                ? 0
                                : 0.7,
                            width: "100%",
                            height: "93vh",
                            overflow: "hidden",
                            position: "relative",
                          }}
                        >
                          <MapGl
                            setContentPage={setContentPage}
                            contentPage={contentPage}
                            setPoiId={setPoiId}
                            setStepId={setStepId}
                            setTravelers={setTravelers}
                            movingPoi={movingPoi}
                            setMovingPoi={setMovingPoi}
                            movingStep={movingStep}
                            setMovingStep={setMovingStep}
                          />
                        </div>
                      </div>
                    </div>
                    <SideMenu
                      showMenu={showMenu}
                      setContentPage={setContentPage}
                    />
                  </>
                }
              />
              <Route
                path='map/:id/discovery'
                element={
                  <div
                    style={{
                      width: "100%",
                      height: "93vh",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <ExploringMapNavBar />
                    <MapGl exploring={true} />
                  </div>
                }
              />
              <Route
                path='/home/*'
                element={<Navigate to='trips' />}
                replace={true}
              />
            </Route>
            <Route path='/unregistered/:id/:link/' element={<CheckLink />}>
              <Route
                path='map/'
                element={
                  <div
                    style={{
                      width: "100%",
                      height: "93vh",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <ExploringMapNavBar />
                    <MapGl exploring={true} />
                  </div>
                }
              />
              <Route path='album' element={<Album />} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} replace={true} />
          </Routes>
        </TravelProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
export default App;
