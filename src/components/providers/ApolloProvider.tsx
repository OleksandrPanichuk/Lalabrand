"use client"
import { makeClient } from "@/lib"
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr"


export function ApolloProvider({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}