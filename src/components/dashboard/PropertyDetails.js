import React, {useEffect, useState} from 'react'

export default function PropertyDetails({property, showAllProperties}) {
    const [details, setDetails] = useState({});
    useEffect(() => {
        const url = `http://localhost:3001/properties/${property}`
        fetch(url)
          .then(res => res.json())
          .then(data => setDetails(data.data));
    }, [])

    return (
        <div>
            <h1>{details.address}</h1>
            <button onClick={showAllProperties}>Go back</button>
        </div>
    )
}
