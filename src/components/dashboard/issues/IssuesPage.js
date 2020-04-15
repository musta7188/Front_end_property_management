import React, { Component } from 'react'
import IssueList from './IssueList'
import {Link} from 'react-router-dom';
import { Route } from 'react-router-dom';
import IssueDetails from './IssueDetails';

const IssuesPage = ({match, issues}) => {

  
    
    return (
      <div>
        <Route exact path={'/issues'} render={() =>  <IssueList issues={issues}/> }/>
      
        <Route exact path={`/issues/:issueID`} render={propsIssuePage => <IssueDetails {...propsIssuePage} issues={issues}  /> }   />
      </div>
    )

}


export default IssuesPage;