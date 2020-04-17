import {Link} from 'react-router-dom';
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
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});











const TenantList = ({tenants}) => {
  const styles = useStyles();

  const renderDetails = () =>{
    const newTenants = tenants.map(obj => ({
        "Full Name": obj.first_name + " " + obj.last_name,
        "Date of Birth" : obj.dob,
        Email: obj.email,
        Property: obj.property_id
      }))

    return(
        <React.Fragment>
            <Typography variant="h2" component="h2" gutterBottom>
                Your tenants:
            </Typography>
            {tenants.length === 0 ? <h1>No tenants yet</h1> : generateTable(newTenants)}
            <br/>
        </React.Fragment>
        )
    }

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

    

  console.log("tenants of this landlord",tenants)

  const renderTenants = tenants.map(tenant=>

    <Link key={tenant.id} to={`/tenants/${tenant.id}`}  > 
    <h1> {tenant.first_name} </h1> </Link>


  )

  return (
    <Container maxWidth="xl">
            <div>{renderDetails()}</div>
    </Container>
  )


}

export default TenantList