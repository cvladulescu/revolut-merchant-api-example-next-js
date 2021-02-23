import Head from "next/head";
import "../styles.css";
import { Text, Link } from '@geist-ui/react';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Simon Say</title>
      </Head>
      <Text h1><Link href="/" block>
        Home
      </Link></Text>
      <Component {...pageProps} />
    </>
  );
}

export default App;
