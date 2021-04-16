import {createContext, ReactNode, useEffect, useState} from 'react';
import Cookies from 'js-cookie'
import Cotter from "cotter"; 
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';
import LogInModal from '../components/LogInModal';

interface ChallengesProviderProps {

    children: ReactNode
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    userName: string,
    isLoggedValue: boolean
}

interface Challenge {
    type: "body" | "eye",
    description: string,
    amount: number
}

interface ChallengesContextData {
    level: number,
    currentExperience: number,
    userName: string,
    challengesCompleted: number,
    activeChallenge: Challenge,
    experienceToNextLevel: number,
    isLogged: boolean
    levelUp: () => void ,
    resetChallenge: () => void,
    completeChallenge: () => void,
    startNewChallenge: () => void,
    closeLevelUpModal: () => void,
    handleSetIsLogged: () => void,
    logOut: () => void,
    
    
}

export const ChallengesContext = createContext( {} as ChallengesContextData );

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps) {
    
    
    const [level, setLevel] = useState(rest.level ?? 1);
    const [isLogged, setIsLogged] = useState(false);
    const [userName, setUserName] = useState(rest.userName ?? "Logue pra ver seu progresso")
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
 
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])
    

    useEffect(() => {

        const cotter = new Cotter('52993d35-d316-4f12-96d7-0a6b81c17b68'); // 👈 Specify your API KEY ID here
        
        if(Cookies.get("isLoggedValue") === "true"){

            setIsLogged(true)
        }
    
        
        const user = cotter.getLoggedInUser();
        setUserName(user?.identifier && user.identifier);
    

        Cookies.set("level", String(level))
        Cookies.set("userName", String(userName))
        Cookies.set("isLoggedValue", String(isLogged))
        Cookies.set("currentExperience", String(currentExperience))
        Cookies.set("challengesCompleted", String(challengesCompleted))

        

    }, [level, currentExperience, challengesCompleted, userName, isLogged])


    function levelUp() {

        setLevel(level + 1);
        setIsLevelUpModalOpen(true)
    }

    function handleSetIsLogged () {

        setIsLogged(true)
    }

    const logOut = async () => {
        const cotter = new Cotter("52993d35-d316-4f12-96d7-0a6b81c17b68"); // 👈 Specify your API KEY ID here
        await cotter.logOut();
        setIsLogged(false);

        Cookies.remove('isLoggedValue')
        Cookies.remove("isLogged")

        window.location.reload()
    };

    function startNewChallenge() {

        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if(Notification.permission === "granted") {

            new Notification("Novo desafio", {

                icon: "/favicon.png",
                body: `Valendo ${challenge.amount} xp`
            })
        }
    }

    function resetChallenge() {

        setActiveChallenge(null)
    }

    function closeLevelUpModal() {

        setIsLevelUpModalOpen(false)
    }

    function completeChallenge() {

        if(!activeChallenge) {
            return;
        }

        const {amount} = activeChallenge

        let finalExperience = currentExperience + amount

        if(finalExperience >= experienceToNextLevel) {

            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    return(

        // Todos os componentes que estiverem dentro do provider terão acesso aos contextos
        <ChallengesContext.Provider value={{level, experienceToNextLevel, currentExperience, resetChallenge,challengesCompleted, activeChallenge, startNewChallenge, levelUp, completeChallenge, closeLevelUpModal, handleSetIsLogged, userName, isLogged: rest?.isLoggedValue, logOut}}> 

            {children}

            { isLogged ? <></> : <LogInModal />}
            { isLevelUpModalOpen ? (<LevelUpModal />) : <></> }
        </ChallengesContext.Provider>
    )
}

