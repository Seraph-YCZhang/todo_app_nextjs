import React, { useEffect } from 'react';
import Head from 'next/head';
import { useAppContext } from '../state';
import { Layout } from '../components/Layout/Layout';
export default function Home() {
    return (
        <Layout>
            <Head>
                <title>To-do App</title>
            </Head>
            <div className='mx-auto p-4 rounded-md'>
                <div>
                    <h2 className='text-2xl mb-4'>This is a to-do app</h2>
                    <div className='text-xl'>
                        <div>A to-do lists for the app</div>
                        <ul>
                            <li>dnd drag-n-drop</li>
                            <li>list</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
