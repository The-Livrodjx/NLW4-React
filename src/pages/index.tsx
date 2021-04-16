import CompletedChallenges from "../components/CompletedChallenges";
import Head from 'next/head'
import Countdown from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import styles from "../styles/pages/Home.module.css"
import ChallengeBox from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { GetServerSideProps } from "next";
import { ChallengesProvider } from "../contexts/ChallengesContext";
import NavBar from "../components/NavBar";



interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  userName: string,
  isLoggedValue: boolean
}

export default function Home(props: HomeProps) {

  return (
    
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
      userName = {props.userName}
      isLoggedValue = {props.isLoggedValue}
      >

      <div className={styles.container}>
      
     
        <Head>
          <title>Início | move.it</title>
        </Head>
        
        <ExperienceBar />

        <NavBar />
        <CountdownProvider>

          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
    
     
    
  )
}

// Executa essa função do Next.js no backend antes de renderizar os componentes e a página,
// serve para executar antes do motor de busca ler tudo 

export const getServerSideProps: GetServerSideProps = async (context) => {

  
  const {level, currentExperience, challengesCompleted, userName, isLoggedValue} = context.req.cookies
  
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      userName: String(userName),
      isLoggedValue: Boolean(isLoggedValue)
    }
  }
}