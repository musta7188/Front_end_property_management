import React, { Component } from 'react'

const IssueDetails =  ( {match, issues}) => {


const issue = issues.filter(issue => issue.id == match.params.issueID)

    return (

      <div>
      <h1>{issue[0].message}</h1>
      </div>
    )
  }


export default IssueDetails