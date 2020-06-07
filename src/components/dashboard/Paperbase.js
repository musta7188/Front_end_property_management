import React from "react";
import {
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import Navigator from "./Navigator";
import Content from "./Content";
import Header from "./Header";
import IssuesPage from "../dashboard/issues/IssuesPage";
import { Route } from "react-router-dom";
import TenantsPage from "./tenants/TenantsPage";
import PropertyDetails from "./PropertyDetails";
import { theme, styles } from "../../styles/PaperbaseStyles";

import TodoPage from "./todos/TodosPage";

const drawerWidth = 256;

function Paperbase(props) {
  const { classes, issues, tenants, todos } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleSelect = (selection) => {
    switch (selection) {
      case "Tenants":
        props.history.push("/tenants");
        break;
      case "My Properties":
        props.history.push("/properties");
        break;
      case "Issues":
        props.history.push("/issues");
        break;
      case "Todos":
        props.history.push("/todos");
        break;
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              user={props.user.first_name}
              handleSelect={handleSelect}
              currentPath={props.history.location.pathname}
            />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header onDrawerToggle={handleDrawerToggle} logout={props.logout} />
          <main className={classes.main}>
            <Route
              exact
              path="/properties"
              render={(routeProps) => (
                <Content
                  {...routeProps}
                  user={props.user}
                  properties={props.properties}
                  handlePropertyState={props.handlePropertyState}
                />
              )}
            />
            <Route
              path="/issues"
              render={(routeProps) => (
                <IssuesPage {...routeProps} issues={issues} />
              )}
            />
            <Route
              path="/tenants"
              render={(routeProps) => (
                <TenantsPage {...routeProps} tenants={tenants} />
              )}
            />
            <Route
              path="/todos"
              render={(routeProps) => (
                <TodoPage {...routeProps} todos={todos} />
              )}
            />
            <Route
              exact
              path={`/properties/:propertyId`}
              render={(propsDetails) => (
                <PropertyDetails
                  {...propsDetails}
                  property={propsDetails.match.params.propertyId}
                  showAllProperties={() => false}
                />
              )}
            />
          </main>
          <footer className={classes.footer}></footer>
        </div>
      </div>
    </ThemeProvider>
  );
}



export default withStyles(styles)(Paperbase);
