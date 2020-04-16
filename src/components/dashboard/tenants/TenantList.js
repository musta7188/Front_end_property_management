import React, {Component} from 'react'

import {Link} from 'react-router-dom';

const TenantList = ({tenants}) => {


  const renderTenants = tenants.map(tenant=>

    <Link key={tenant.id} to={`/tenants/${tenant.id}`}  > 
    <h1> {tenant.first_name} </h1> </Link>


  )

return (
  <div>
{renderTenants}
  </div>
)


}

export default TenantList