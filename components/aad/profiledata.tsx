import React from 'react'

const ProfileData = ({graphData}:{graphData:any}) => {
  return (
    <div>
      <div>
        {/*JSON.stringify(graphData)*/}<br/>
      </div>
      <div>
        {graphData && Object.keys(graphData).map((key,index) => (
          <div key={index}>{key} => {graphData[key]}</div>
        ))}
      </div>
    </div>
  )
}

export {ProfileData};

/*
{"@odata.context":"https://graph.microsoft.com/v1.0/$metadata#users/$entity",
"businessPhones":["1748882537"],
"displayName":"Smart 365 User",
"givenName":"Smart 365",
"jobTitle":null,
"mail":"mohammed.asif@smart365ai.onmicrosoft.com",
"mobilePhone":null,
"officeLocation":null,
"preferredLanguage":null,
"surname":"User",
"userPrincipalName":"mohammed.asif@smart365ai.onmicrosoft.com",
"id":"907d50a5-cfba-4b63-a4b0-74834a7790ef"}
*/