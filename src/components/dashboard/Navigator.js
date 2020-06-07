import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import PermMediaOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActual";
import HomeWorkRoundedIcon from "@material-ui/icons/HomeWorkRounded";
import { styles } from "../../styles/NavigatorStyles";

function Navigator(props) {
  const { classes, ...other } = props;
  const [active, setActive] = useState("My Properties");

  useEffect(() => {
    setTheCurrentActive();
  }, [active]);

  const setTheCurrentActive = () => {
    const actualPath = props.currentPath.slice(1);
    switch (actualPath) {
      case "tenants":
        setActive("Tenants");
        break;
      case "properties":
        setActive("My Properties");
        break;
      case "issues":
        setActive("Issues");
        break;
      case "todos":
        setActive("Todos");
        break;
    }
  };

  const categories = [
    {
      id: "Main Menu",
      children: [
        {
          id: "My Properties",
          icon: <HomeWorkRoundedIcon />,
          active: active === "My Properties" ? true : false,
        },
        {
          id: "Tenants",
          icon: <DnsRoundedIcon />,
          active: active === "Tenants" ? true : false,
        },
        {
          id: "Issues",
          icon: <PermMediaOutlinedIcon />,
          active: active === "Issues" ? true : false,
        },
        {
          id: "Todos",
          icon: <PermMediaOutlinedIcon />,
          active: active === "Todos" ? true : false,
        },
      ],
    },
  ];

  // handleSelect

  const handleClick = (id) => {
    props.handleSelect(id);
    return active !== id ? setActive(id) : null;
  };

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          Property Management
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            {props.user}
          </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem
                key={childId}
                button
                className={clsx(classes.item, active && classes.itemActiveItem)}
                onClick={() => handleClick(childId)}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
