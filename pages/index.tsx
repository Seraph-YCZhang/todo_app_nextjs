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
            <div
                className=''
                style={{ width: '100vw', height: '100%' }}
            >
                <div className='mx-auto p-4 rounded-md text-gray-500 text-9xl '>
                    <div>
                        <h2 className='text-6xl mb-4 font-bold'>DRAGGABLE TODO LIST</h2>
                        <div className='text-4xl'>
                            <div>NEXT.JS DJANGO TAILWIND.CSS</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
