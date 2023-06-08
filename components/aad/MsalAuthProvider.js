"use client";
 
//import { ThemeProvider } from 'acme-theme';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { authConfig } from "@/components/aad/authConfig";


export const msalInstance  = new PublicClientApplication(authConfig);

//const accounts = msalInstance.getAllAccounts();
//if (accounts.length > 0) {
//  msalInstance.setActiveAccount(accounts[0]);
//}

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }
});

 
export function MsalAuthProvider({ children }) {
  return (
    <MsalProvider instance={msalInstance}>{children}</MsalProvider>
  );
}