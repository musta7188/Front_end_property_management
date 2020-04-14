import React, {useEffect, useState} from 'react'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

export default function PropertyDetails({property, showAllProperties}) {

    //load the property details
    const [details, setDetails] = useState(0);
    useEffect(() => {
        const url = `http://localhost:3001/properties/${property}`
        fetch(url)
          .then(res => res.json())
          .then(data => setDetails(data));
    }, [])

    // render the details after is loaded
    const renderDetails = () =>{
        const tenant = details.tenants[0];
        return(
            <React.Fragment>
                <h2>{details.property.address}</h2>
                <p>{tenant.first_name}</p>
            </React.Fragment>
        )
    }

    //main return
    return (
        <Container maxWidth="xl">
            <div>{details !== 0 ? renderDetails() : null}</div>
            <Button onClick={showAllProperties} variant="contained" color="primary">Go back</Button>
        </Container>
    )
}
