import React, {useEffect, useState} from 'react'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

export default function PropertyDetails({property, showAllProperties, history}) {
    const styles = useStyles();
    
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
                    Tenants:
                </Typography>
                {tenants.length === 0 ? <h1>No tenants yet</h1> : generateTable(newTenants)}
                <br/><hr/><br/>
                <Typography variant="h5" gutterBottom>
                    Issues:
                </Typography>
                {issues.length === 0 ? <h1>No issues yet</h1> : generateTable(newIssues)}
                <br/><hr/><br/>
                <Typography variant="h5" gutterBottom>
                    Tenants:
                </Typography>
                {todos.length === 0 ? <h1>No tenants yet</h1> : generateTable(newTodos)}
                <br/><hr/><br/>
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



    //main return
    return (
        <Container maxWidth="xl">
            <div>{issues !== 0 ? renderDetails() : null}</div>
            <Button onClick={() => history.push('/properties')} variant="contained" color="primary">Go back</Button>
        </Container>
    )
}

// 