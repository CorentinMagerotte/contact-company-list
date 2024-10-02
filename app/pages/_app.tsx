import React from 'react';
import {AppProps} from "next/app";
import {ApolloProvider} from "@apollo/client";
import client from "@/app/lib/apollo-client";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}
