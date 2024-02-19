import { useState } from "react";
import UserContext from "./UserContext";


const UserContextProvider = ({children}) => {

    const [validUserInfo, setValidUserInfo] = useState('')
    const [validEmail, setValidEmail] = useState(null)

    return(
        <UserContext.Provider value={{validUserInfo, setValidUserInfo, validEmail, setValidEmail}}> 
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider