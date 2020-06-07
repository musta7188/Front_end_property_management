import React,{useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import Modal from '@material-ui/core/Modal';
import AddProperty from '../forms/AddProperty'
import PropertyDetails from './PropertyDetails'
import {deleteProperty, createNewProperty } from '../../API/APIs'
import {styles, getModalStyle, useStyles} from '../../styles/ContentStyle'
import PropertyCard from './PropertyCard'




function Content(props) {
  //check to see if we should show the details of a property
  const [details, setDetails] = useState(false);

  //load the properties in a state
  const [properties, setProperties] = useState(props.properties ? props.properties : []);
  
  //related to the modal
  const layout = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleAddProperty = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //function called when the user click in the trash bin
  const handleDeleteProperty = (id) => {
    
    deleteProperty(id)
    .then((res) => {
      setProperties(properties.filter(p => p.id !== id));
      props.handlePropertyState(res.data, 'delete');
    } );
  }

  //function called when add a new property 
  const addNewProperty = (e, value) => {
    value = {
      ...value,
      landlord_id : props.user.id
    }
    createNewProperty(value).then(data => {
          handleClose();
          setProperties([...properties, data.property]);

          //send the information back to App.js to update the state
          props.handlePropertyState(data.property, 'add');
          
        });
  }

  const body = (//whats going to be inside the modal
    <div style={modalStyle} className={layout.paper}>
      <AddProperty addNewProperty={addNewProperty}/>
    </div>
  );

  //render all properties
  const renderProperties = () => {
  
    if (properties.length === 0) {
      return (
        <Typography color="textSecondary" align="center">
            You don't have any properties yet
        </Typography>
      )
    }
    //render individual property cards
    else{
      return (
        <div className={classes.propertyGrid}>
          <Grid container spacing={1}>
            {properties.map(property => <PropertyCard property={property} classes={classes} handleDeleteProperty={handleDeleteProperty} handlePropertyClick={(id) => setDetails(id)}/> )}
          </Grid>
        </div>
      )
    }
  }

  const { classes } = props;

  //function => render all properties
  const renderNoDetails = () => {
    return (
      <Paper className={classes.paper}>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className={classes.block} color="inherit" />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by address"
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput,
                }}
              />
            </Grid>
            <Grid item>
            {/* Button to open modal to add a new property */}
              <Button variant="contained" color="primary" className={classes.addUser} onClick={handleAddProperty}>
                Add Property
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon className={classes.block} color="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        {renderProperties()}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </Paper>
    )
  }

  return (
    <React.Fragment>

    
    {!details ? renderNoDetails() : <PropertyDetails property={details} showAllProperties={() => setDetails(false)}/> } 

      
      
  </React.Fragment>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);