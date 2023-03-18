import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import EventsGroupsNav from "./components/EventsGroupsNav";
import AllGroups from "./components/AllGroups";
import GroupDetails from "./components/GroupDetails";
import GroupForm from "./components/GroupForm";
import EditWrapper from "./components/GroupForm/editWrapper";
import GroupDetailsWrapper from "./components/GroupDetails/groupDetailsWrapper";
import AllEvents from './components/AllEvents'
import EventDetails from './components/EventDetails'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const formNew = 'new'
  const formEdit = 'edit'

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
            <AllEvents />
          </Route>
          {/* add in key for formType */}
          {/* {['/groups/new', '/groups/:id/edit']} */}
          <Route path= '/groups/:id/edit' exact>
            <EditWrapper />
          </Route>
          <Route path= '/groups/new' exact>
            <GroupForm currentGroup={{}} formType={'new'}/>
          </Route>
          <Route path='/groups/:id' exact>
            <GroupDetailsWrapper />
          </Route>
          <Route path='/events/:id'>
              <EventDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
