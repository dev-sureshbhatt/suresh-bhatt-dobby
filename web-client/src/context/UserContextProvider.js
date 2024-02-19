import { useState } from "react";
import UserContext from "./UserContext";


const UserContextProvider = ({children}) => {

    const [validUserInfo, setValidUserInfo] = useState('')

    return(
        <UserContext.Provider value={{validUserInfo, setValidUserInfo}}> 
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider