import { useContext, useEffect } from "react";
import styles from "../styles/components/LogInModal.module.css";
import Cotter from "cotter"; //  1️⃣  Import Cotter
import { useRouter } from "next/router";
import { ChallengesContext } from "../contexts/ChallengesContext";

export default function LogInModal() {

    const {handleSetIsLogged} = useContext(ChallengesContext)

    //  2️⃣ Initialize and show the form

    useEffect(() => {
        var cotter = new Cotter("52993d35-d316-4f12-96d7-0a6b81c17b68"); // 👈 Specify your API KEY ID here
        cotter
            .withFormID("form_default") // Use customization for form "form_default"
            .signInWithLink() // use .signInWithOTP() to send an OTP
            .showEmailForm() // use .showPhoneForm() to send magic link to a phone number
            .then((response) => {

                console.log(response); // show the response
                
                handleSetIsLogged()

                window.location.reload()

            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <h1 className={styles.subtitle}>Bem-vindo ao Move-it</h1>

                {/*  3️⃣  Put a <div> that will contain the form */}
                <div id="cotter-form-container" style={{ width: 300, height: 300 }} />
            </div>
        </div>

    );
}