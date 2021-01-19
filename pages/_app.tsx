// import '../styles/globals.css'
import 'tailwindcss/tailwind.css';
import AppContext from '../state';

function MyApp({ Component, pageProps }) {
    return (
        //<AppContext>
            <Component {...pageProps} />
       // </AppContext>
    );
}

export default MyApp;
