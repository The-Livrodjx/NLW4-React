import { useContext } from "react"
import { ChallengesContext } from "../contexts/ChallengesContext"

export default function NavBar() {
    
    const {isLogged, logOut} = useContext(ChallengesContext)
    return(
        <div>
            {isLogged ? (
                <button style={{ padding: 14, position: 'absolute', top: 10, right:10}} onClick={logOut}>
                Log Out
                </button>


            ) : (
                < >
                </>
            )}
        </div>
    )
}