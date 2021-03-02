import Link from "next/link";
import Firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBSRQKu0_PlW8TuzH8QKtHfGWkFJfVuwJU",
  authDomain: "simonsays-a.firebaseapp.com",
  projectId: "simonsays-a",
  databaseURL: "https://simonsays-a-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "simonsays-a.appspot.com",
  messagingSenderId: "364238325183",
  appId: "1:364238325183:web:7fc8e1ac332df9e644cd0a",
  measurementId: "G-R6LET9H9EW"
};

Firebase.initializeApp(firebaseConfig);

Firebase.database().ref('/').set("MESAJ");


function SuccessPage() {
  return (
    <>
      <h2>
        <Link href="/">
          <a>Catalogue</a>
        </Link>
        {" / "}
        Confirmation
      </h2>
      <h3>Order successfully paid</h3>
    </>
  );
}

export default SuccessPage;
