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

import PropertyCard from './PropertyCard'

const POST_URL = 'http://localhost:3001/properties';

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  propertyGrid: {
    flexGrow: 1,
  },
  propertyCard: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

//related to the modal
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

//related to the modal
function getModalStyle() {
  const top = 35 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

//related to the modal
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

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
    
    fetch(`${POST_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((res) => setProperties(properties.filter(p => p.id !== id)));
  }

  //function called when add a new property 
  const addNewProperty = (e, value) => {
    value = {
      ...value,
      landlord_id : props.user.id
    }
        fetch(POST_URL, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(value)
        })
        .then(res => res.json())
        .then(data => {
          handleClose();
          setProperties([...properties, data.property]);
          
        });
  }

  const body = (//whats going to be inside the modal
    <div style={modalStyle} className={layout.paper}>
      <AddProperty addNewProperty={addNewProperty}/>
    </div>
  );

  //end of related stuff to modal

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
      {!details ? renderNoDetails() : <PropertyDetails property={details} showAllProperties={() => setDetails(false)}/> } {/*if details is false, all pros is showed*/}
      
  </React.Fragment>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);