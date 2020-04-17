import React, {useEffect, useState} from 'react'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddTenant from '../forms/AddTenant';
import Divider from '@material-ui/core/Divider';

const POST_TENANTS_URL = 'http://localhost:3001/tenants';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


//related to the modal
function getModalStyle() {
  const top = 30;
  const left = 40;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

//related to the modal
const modalStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function PropertyDetails({property, showAllProperties, history}) {
    const styles = useStyles();

    //related to the modal
    const layout = modalStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    
    //load the property details
    const [details, setDetails] = useState(0);
    const [tenants, setTenants] = useState(0);
    const [issues, setIssues] = useState(0);
    const [todos, setTodos] = useState(0);

    useEffect(() => {
        const url = `http://localhost:3001/properties/${property}`
        fetch(url)
          .then(res => res.json())
          .then(data => {
            setDetails(data.property);
            setTenants(data.tenants);
            setTodos(data.todos);
            setIssues(data.issues);
          });
    }, [])

    //close the modal
    const handleClose = () => {
      setOpen(false);
    };

    // render the details after is loaded
    const renderDetails = () =>{
        const newTenants = tenants.map(obj => ({
            "Full Name": obj.first_name + " " + obj.last_name,
            "Date of Birth" : obj.dob,
            Email: obj.email
          }))

          const newIssues = issues.map(obj => ({
            Message: obj.message,
            Priority : obj.priority,
            Completed : obj.isCompleted.toString().replace('false', 'No').replace('true', 'Yes')
          }))

          const newTodos = todos.map(obj => ({
            Message: obj.message,
            Completed : obj.isCompleted.toString().replace('false', 'No').replace('true', 'Yes')
          }))
          
          
        return(
            <React.Fragment>
                <Typography variant="h2" component="h2" gutterBottom>
                    {details.address}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Tenants at this property:
                </Typography>
                {tenants.length === 0 ? <h1>No tenants yet</h1> : generateTable(newTenants)}
                <br/>

                <Button 
                  onClick={() => setOpen(true)} 
                  variant="contained" 
                  color="primary">
                  Add New Tenant
                </Button>


                <br/><br/><Divider /><br/>
                <Typography variant="h5" gutterBottom>
                    Issues on this property:
                </Typography>
                {issues.length === 0 ? <h1>No issues for this property yet</h1> : generateTable(newIssues)}
                <br/><br/><Divider /><br/>
                <Typography variant="h5" gutterBottom>
                    Todos for this property:
                </Typography>
                {todos.length === 0 ? <h1>No todos for this property yet</h1> : generateTable(newTodos)}
                <br/><br/><Divider /><br/>
            </React.Fragment>
        )
    }
   
    //generate table for each state (tenants, issues, and todos)
    const generateTable = (newTenants) =>{
        const keys = Object.keys(newTenants[0]);
        return (
            <TableContainer component={Paper}>
                <Table className={styles.table} aria-label="simple table">
        <TableHead>
          <TableRow>

            {keys.map(k => (<TableCell key={k}>{k}</TableCell>) )}
          </TableRow>
        </TableHead>
        <TableBody>
        {newTenants.map((row) => renderRows(row,keys))}
        </TableBody>
      </Table>
            </TableContainer>
        )
    }

    const renderRows = (row,keys) => {

      return (
        <TableRow key={'aa'}>
        {keys.map(k => (
          <TableCell component="th" scope="row">
            {row[k]}
          </TableCell>  
        ))}
      </TableRow>
      )
    }

    const addNewTenant = (e, value) => {
      value = {
        ...value,
        property_id : property
      };
          fetch(POST_TENANTS_URL, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(value)
          })
          .then(res => res.json())
          .then(data => {
            handleClose();
            console.log(data);
            setTenants([...tenants, data.tenant]);
            renderDetails();
            // setProperties([...properties, data.property]);
  
            
            
          });
    }



    //main return
    return (
        <Container maxWidth="xl">
            <div>{issues !== 0 ? renderDetails() : null}</div>
            <Button onClick={() => history.push('/properties')} variant="contained" color="primary">Go back</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                <div style={modalStyle} className={layout.paper}>
                  <AddTenant addNewTenant={addNewTenant}/>
                </div>
            </Modal>
        </Container>
    )
}

// 