import React, { Component } from 'react'

const IssueDetails =  ( {match, issues}) => {




    return (

      <div>
      <h1>{issues[match.params.issueID].message}</h1>
      </div>
    )
  }


export default IssueDetails