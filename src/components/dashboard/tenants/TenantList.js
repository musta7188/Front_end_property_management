import React, {Component} from 'react'

import {Link} from 'react-router-dom';

const TenantList = ({tenants}) => {


  const renderTenants = Object.keys(tenants).map(tenantID =>

    <Link key={tenantID} to={`/tenants/${tenantID}`}  > 
    <h1> {tenants[tenantID].first_name} </h1> </Link>


  )

return (
  <div>
{renderTenants}
  </div>
)


}

export default TenantList