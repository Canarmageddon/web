import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ToDoLists from "./components/toDoLists/ToDoLists";
import TravelsList from "./components/travelList/TravelList";
import NavBar from "./components/navBar/NavBar";
import SideMenu from "./components/navBar/SideMenu";
import Admin from "./components/admin/Admin";
import { TravelProvider } from "./context/TravelContext";
import Profile from "./components/profile/Profile";
import { UserProvider } from "./context/userContext";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import MapGl from "./components/mapHandler/MapGl";
import PoiInformation from "./components/mapHandler/PoiInformation";
import LocationInformation from "./components/mapHandler/LocationInformation";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Details from "./components/details/Details";
import StepInfo from "./components/mapHandler/StepInfo";
import RequireAuth from "./context/requireAuth";
import ExploreTrips from "./components/explore/ExploreTrips";
import ExploreRoute from "./components/explore/ExploreRoute";
import ExploringMapNavBar from "./components/navBar/ExploringMapNavBar";
import Album from "./components/album/Album";
import CheckLink from "./components/album/unregistered/CheckLink";
import Background from "./components/Background";
import Home from "./components/album/Home";
import UnregisteredNavBar from "./components/navBar/UnregisteredNavBar";

function App() {
  const [contentPage, setContentPage] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const [poiId, setPoiId] = useState(false);
  const [locationId, setLocationId] = useState(false);
  const [stepId, setStepId] = useState(false);
  const [travelers, setTravelers] = useState([]);
  const [movingStep, setMovingStep] = useState(null);
  const [movingPoi, setMovingPoi] = useState(null);
  const displayMapForAlbum = () => (
    <>
      <UnregisteredNavBar map={true} setContentPage={setContentPage} />
      <div style={{ display: "flex" }}>
        <LocationInformation
          display={contentPage === "locationInfo"}
          locationId={locationId}
        />
        <div
          style={{
            height: "100vh",
            flex: contentPage === "map" ? 1 : 0.7,
          }}
          className="map-container"
        >
          <MapGl
            exploring={true}
            setContentPage={setContentPage}
            displayAlbum={true}
            setLocationId={setLocationId}
          />
        </div>
      </div>
    </>
  );
  return (
    <BrowserRouter>
      <UserProvider>
        <TravelProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home/" element={<RequireAuth />}>
              <Route path="explore/" element={<ExploreRoute />}>
                <Route path="list" element={<ExploreTrips />} />
                <Route
                  path="map/:id"
                  element={
                    <div
                      style={{
                        height: "100vh",
                      }}
                      className="map-container"
                    >
                      <ExploringMapNavBar setContentPage={setContentPage} />
                      <MapGl
                        exploring={true}
                        setContentPage={setContentPage}
                        displayAlbum={false}
                      />
                    </div>
                  }
                />
              </Route>
              <Route
                path="trips"
                element={<TravelsList setContentPage={setContentPage} />}
              />
              <Route
                path="profile"
                element={
                  <Profile
                    contentPage={contentPage}
                    setContentPage={setContentPage}
                  />
                }
              />
              <Route path="album/:idAlbum" element={<Album />} />
              <Route
                exact
                path="map/:id"
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
                        <LocationInformation
                          display={contentPage === "locationInfo"}
                          locationId={locationId}
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
                          setPoiId={setPoiId}
                          setStepId={setStepId}
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
                            height: "95vh",
                          }}
                          className="map-container"
                        >
                          <MapGl
                            setContentPage={setContentPage}
                            contentPage={contentPage}
                            setPoiId={setPoiId}
                            setLocationId={setLocationId}
                            setStepId={setStepId}
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
                exact
                path="map/:id/history"
                element={
                  displayMapForAlbum()
                  /*                   <>
                    <div
                      style={{
                        marginLeft: showMenu ? 200 : 0,
                        transition: "0.5s",
                      }}
                    >
                      <UnregisteredNavBar setContentPage={setContentPage} />
                      <div style={{ display: "flex" }}>
                        <LocationInformation
                          display={contentPage === "locationInfo"}
                          locationId={locationId}
                        />
                      </div>
                      <div
                        style={{
                          flex:
                            contentPage === "map"
                              ? 1
                              : contentPage === "locationInfo"
                              ? 0
                              : 0.7,
                          height: "95vh",
                        }}
                        className='map-container'
                      >
                        <MapGl
                          exploring={true}
                          setContentPage={setContentPage}
                          displayAlbum={true}
                          setLocationId={setLocationId}
                        />
                      </div>
                    </div>
                    <SideMenu
                      showMenu={showMenu}
                      setContentPage={setContentPage}
                    />
                  </> */
                }
              />
              <Route
                path="map/:id/discovery"
                element={
                  <>
                    <ExploringMapNavBar setContentPage={setContentPage} />
                    <div
                      style={{
                        height: "100vh",
                      }}
                      className="map-container"
                    >
                      <MapGl exploring={true} setContentPage={setContentPage} />
                    </div>
                  </>
                }
              />
              <Route
                path="/home/*"
                element={<te to="trips" />}
                replace={true}
              />
            </Route>
            <Route path="/unregistered/:id/:link/" element={<CheckLink />}>
              <Route path="home/" element={<Home />} />
              <Route path="map/" element={displayMapForAlbum()} />
              <Route
                path="album/:idAlbum"
                element={
                  <>
                    <UnregisteredNavBar
                      map={false}
                      setContentPage={setContentPage}
                    />
                    <Album />
                  </>
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/" />} replace={true} />
          </Routes>
          <Background display={!contentPage} />
        </TravelProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
export default App;
