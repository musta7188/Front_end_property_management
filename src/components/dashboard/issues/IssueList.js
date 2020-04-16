import React, { Component } from 'react'

import {Link} from 'react-router-dom';


const IssueList = ({issues}) => {



  const renderIssues = issues.map(issue =>

    <Link key={issue.id} to={`/issues/${issue.id}`}  > <h1>{issue.message}</h1> </Link>
    )



    return (
      <div>
        {renderIssues}
      </div>
    )
  }



export default IssueList
