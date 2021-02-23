import Head from "next/head";
import Link from "next/link";
import "../styles.css";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Simon Say</title>
      </Head>
      <Link href="/">
        <h1>Donate</h1>
      </Link>
      <Component {...pageProps} />
    </>
  );
}

export default App;
