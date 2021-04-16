import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css'


export default function Countdown() {


    const {minutes,seconds,hasFineshed,isActive,startCountdown, resetCountdown} = useContext(CountdownContext)

   

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')


    

    
    return (
        <div>         
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>

                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFineshed ? (
                
                <button
                    disabled
                    className={styles.countdownButton}
                    >
                    Ciclo encerrado
                </button>
            ) : (
                // fragment
                <> 

                    {isActive ? (
                        <button type="button" 
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetCountdown}
                            >
                            Abandonar ciclo
                        </button>
                    ) : (

                        <button type="button" 
                            className={styles.countdownButton}
                            onClick={startCountdown}
                            >
                            Iniciar ciclo
                        </button>
                    )} 

                </>
            )}
        
        </div>
         
    )
}