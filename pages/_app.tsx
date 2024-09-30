import '../styles/app.scss'
import React, { FC, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface MyComponentProps {
    name: string;
}

function MyApp({ Component, pageProps }: { Component: FC<MyComponentProps>, pageProps: any }) {
    const router = useRouter();

    useEffect(() => {
        router.push('/register');
    }, [])

    return (
        <Provider store={store}>
            <Head>
                <title>VioletNotes</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;