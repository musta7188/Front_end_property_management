import React, { Component } from 'react'

import {Link} from 'react-router-dom';


const IssueList = ({issues}) => {



  const renderIssues = Object.keys(issues).map(issueID =>

    <Link key={issueID} to={`/issues/${issueID}`}  > <h1>{issues[issueID].message}</h1> </Link>
    )



    return (
      <div>
        {renderIssues}
      </div>
    )
  }



export default IssueList
