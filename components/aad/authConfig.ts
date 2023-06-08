/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel, Configuration,RedirectRequest  } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */

//https://login.microsoftonline.com
//https://myapps.microsoft.com/signin/google/319009da-059a-4ca4-be5f-4089c3e208fc?tenantid=e94be3cd-6c27-4a88-a278-afbb29460422
/**
Email one-time passcode guest users can also use application endpoints that include your tenant information, for example:

https://myapps.microsoft.com/?tenantid=<your tenant ID>
https://myapps.microsoft.com/<your verified domain>.onmicrosoft.com
https://portal.azure.com/<your tenant ID>
You can also give email one-time passcode guest users a direct link to an application or resource by including your tenant information, 
for example https://myapps.microsoft.com/signin/Twitter/<application ID?tenantId=<your tenant ID>.
 */

//https://Enter_the_Tenant_Subdomain_Here.ciamlogin.com

export const authConfig:Configuration = {
    auth: {
        clientId: "319009da-059a-4ca4-be5f-4089c3e208fc",
        authority: "https://smart365ai.ciamlogin.com/",
        redirectUri: '/', // You must register this URI on Azure Portal/App Registration. Defaults to window.location.href e.g. http://localhost:3000/
        navigateToLoginRequestUrl: true, // If "true", will navigate back to the original request location before processing the auth code response.
    
        
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level, message, containsPii) => {	
                if (containsPii || process.env.NODE_ENV === "production") {		
                    return;		
                }		
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }	
            }	
        }	
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest:RedirectRequest = {
    scopes: ["offline_access","openid","User.Read"],
    
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};