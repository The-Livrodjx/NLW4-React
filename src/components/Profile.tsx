import styles from '../styles/components/Profile.module.css'
import { ChallengesContext } from '../contexts/ChallengesContext';
import { useContext } from 'react';

export default function Profile() {

    const {level, userName} = useContext(ChallengesContext)

    return (

        <div className={styles.profileContainer}>
            <img src="https://i.pinimg.com/564x/d5/1e/ac/d51eac9d8a76d287a333103ed060ad5a.jpg" alt="Livrodjx"/>

            <div>
                <strong>{userName}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}