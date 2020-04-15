import React, {Component} from 'react'


const TenantDetails = ({match, tenants}) => {


  return(
    <div>

  <h1>{tenants[match.params.tenantID].first_name}</h1>
    </div>

  )


}

export default TenantDetails