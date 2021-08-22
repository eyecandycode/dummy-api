import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Posts from "./components/posts/Posts";
import Search from "./components/Search";
import Graph from "./components/Graph";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const AppStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.02);
  overflow-x: hidden;
`;

function App() {
  return (
    <AppStyles>
      <Router>
        <Header />
        <main>
          <Switch>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route exact path="/graph">
              <Graph />
            </Route>
            <Route path="/">
              <Posts />
            </Route>
          </Switch>
        </main>
      </Router>
    </AppStyles>
  );
}

export default App;
