/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from "react";
import { Helmet } from "react-helmet-async";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "styles/scss/global.scss";

import { NotFoundPage } from "./components/NotFoundPage";

import { Header } from "./containers/Header";
import { Wrapper } from "./containers/Wrapper/Loadable";
import { Sidebar } from "./components/Sidebar";
import { PoolContainer } from "./containers/PoolContainer/Loadable";
import { UserData } from "./containers/UserData/Loadable";
import { Content } from "./containers/Content";
import Notification from "./components/Notification";

import ApolloContainer from "./components/ApolloContainer";
import Web3Container from "./components/Web3Container";

import { Paths } from "./constants/paths";

import { useState } from "react";
import { TermsAndConditions } from "./components/TermsAndConditions";
import { hotjar } from "react-hotjar";
import getHotJarInfo from "utils/getHotJarInfo";

export function App() {
  const totem = "FOX";
  React.useEffect(() => {
    const [hjid, hjsv] = getHotJarInfo();
    hotjar.initialize(hjid, hjsv);
  }, []);
  const [showConnectMetamaskModel, setShowConnectMetamaskModel] = useState(
    false
  );

  return (
    <Web3Container>
      <ApolloContainer>
        <BrowserRouter>
          <Helmet
            titleTemplate="TotemFi - Predictor Protocol App"
            defaultTitle="TotemFi - Predictor Protocol App"
          >
            <meta name="description" content="Totem" />
          </Helmet>
          <Header />
          <TermsAndConditions />
          <Wrapper>
            <Sidebar />
            <Content>
              <Switch>
                <Route exact path={Paths.home} component={PoolContainer} />
                <Route
                  exact
                  path={[
                    Paths.pools("fox"),
                    Paths.pools("owl"),
                    Paths.pools("wolf"),
                  ]}
                  component={PoolContainer}
                />
                <Route
                  exact
                  path={Paths.user}
                  component={() => (
                    <UserData
                      isOpen={showConnectMetamaskModel}
                      close={() => setShowConnectMetamaskModel(false)}
                      totem={totem}
                    />
                  )}
                />
                <Route component={NotFoundPage} />
              </Switch>
            </Content>
            <Notification />
          </Wrapper>
          {/* <GlobalStyle /> */}
        </BrowserRouter>
      </ApolloContainer>
    </Web3Container>
  );
}
