import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(3),
        width: '90%', 
      },
    },
    root2: {
        flexGrow: 1,
    },
    rooms: {
      '& > *': {
        width: '100%', 
      },
    },
    dobStyle: {
        '& > *': {
          width: '50%', 
        },
      },
    paper: {
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
      },
  }));

export default function AddTenant(props) {
    const [value, setValue] = useState({
        first_name: '',
        last_name: '',
        email: '',
        dob: ''
    })

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addNewTenant(e, value);
        }
    
    const handleChange = (e) => {
        setValue({...value, [e.target.name]: e.target.value});
    }
    
    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            
            <TextField
                className={classes.rooms}
                id="outlined-number"
                label="First Name"
                
                name="first_name"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                onChange={e => handleChange(e)}
                />
            
            
                <TextField
                    className={classes.rooms}
                    id="outlined-number"
                    label="Last Name"
                    
                    name="last_name"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={e => handleChange(e)}
                />

                <TextField
                    className={classes.rooms}
                    id="outlined-number"
                    label="Email"
                    
                    name="email"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={e => handleChange(e)}
                />
            
                <TextField
                    id="date"
                    name="dob"
                    label="Birthday (dd/mm/yyyy)"
                    type="date"
                    defaultValue=""
                    onChange={e => handleChange(e)}
                    className={classes.dobStyle}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<PersonAddIcon/>}
                 >
                Create New Tenant
            </Button>
            
        </form>
    )
}
