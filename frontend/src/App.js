import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import EventsGroupsNav from "./components/EventsGroupsNav";
import AllGroups from "./components/AllGroups"
import GroupDetails from "./components/GroupDetails"
import GroupForm from "./components/GroupForm"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/' exact>
            <LandingPage />
          </Route>
          <Route path='/groups' exact>
            <EventsGroupsNav />
            <AllGroups />
          </Route>
          <Route path='/events' exact>
            <EventsGroupsNav />
          </Route>
          {/* add in key for formType */}
          <Route path ={['/groups/new', '/groups/:id/edit']} exact>
            <GroupForm />
          </Route>
          <Route path='/groups/:id' exact>
            <GroupDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
