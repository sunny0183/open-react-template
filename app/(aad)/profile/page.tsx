"use client";

import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionType, InteractionRequiredAuthError } from "@azure/msal-browser";
//import { loginRequest } from "../src/authConfig";
import { loginRequest } from '@/components/aad/authConfig';
import React, { useEffect, useState } from "react";
import { ProfileData } from "@/components/aad/profiledata";
import { callMsGraph } from "@/components/aad/msgraphapicall";
//import Paper from "@mui/material/Paper";
//import Typography from "@mui/material/Typography";

const ProfileContent = () => {
    const { instance, inProgress } = useMsal();
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        if (!graphData && inProgress === InteractionStatus.None) {
            callMsGraph().then(response => setGraphData(response)).catch((e) => {
                if (e instanceof InteractionRequiredAuthError) {
                    instance.acquireTokenRedirect({
                        ...loginRequest,
                        account: instance.getActiveAccount()||undefined
                    });
                }
            });
        }
    }, [inProgress, graphData, instance]);
  
    return (
        <div>
            { graphData ? <ProfileData graphData={graphData} /> : null }
        </div>
    );
};

const ErrorComponent = ({error}:{error:any}) => {
    return <h6>An Error Occurred: {error.errorCode}</h6>;
}

const Loading = () => {
    return <h6>Authentication in progress...</h6>
}

export default function Profile() {
    const authRequest = {
        ...loginRequest
    };

    return (
        <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    <MsalAuthenticationTemplate 
                        interactionType={InteractionType.Redirect} 
                        authenticationRequest={authRequest} 
                        errorComponent={ErrorComponent} 
                        loadingComponent={Loading}
                    >
                    Msal Authentication Template

                        <ProfileContent />
                    </MsalAuthenticationTemplate>
                </div>
            </div>
        </section>
    )
};