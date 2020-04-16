import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import TenantList from './TenantList'
import TenantDetails from './TenantDetails'

 const TenantsPage = ({match, tenants}) => {
  
  return (
    <div>
      <Route exact path={'/tenants'} render={() =>  <TenantList tenants={tenants}/> }/>
    
      <Route exact path={`/tenants/:tenantID`} render={propsIssuePage => 
      <TenantDetails {...propsIssuePage} tenants={tenants}  /> }   />
    </div>
  )

}

export default TenantsPage