import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(3),
        width: '90%', 
      },
    },
    rooms: {
      '& > *': {
        width: '50%', 
      },
    }
  }));

export default function AddProperty() {
    const [value, setValue] = useState({
        address: '',
        rooms: ''
    })

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('dasda');
        }
    
    const handleChange = (e) => {
        setValue({...value, [e.target.name]: e.target.value});
    }
    
    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        
            <TextField 
                width="100%" 
                name="address" 
                id="outlined-basic" 
                label="Address" 
                variant="outlined" 
                onChange={e => handleChange(e)}
                // value={value.address}
                />
            <TextField
                className={classes.rooms}
                id="outlined-number"
                label="Number of Rooms"
                type="number"
                name="rooms"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                onChange={e => handleChange(e)}
                />
                <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Icon>home</Icon>}
                 >
                Create New Property
            </Button>
        </form>
    )
}
