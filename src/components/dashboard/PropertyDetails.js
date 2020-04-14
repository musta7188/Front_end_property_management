import React, {useEffect, useState} from 'react'

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

    return (
        <div>
            <h1>{details !== 0 ? details.property.address : null}</h1>
            <button onClick={showAllProperties}>Go back</button>
        </div>
    )
}
