import React, { createContext, useContext, useState } from "react";

//create empty context object
const userContext = createContext({ email: "", id: "", username: "" })

function UserProvider({...props}) {
  const [authTokens, setAuthTokens] = useState({
    email: "", id: "", username: "" 
  })
  return <userContext.Provider value={{authTokens, setAuthTokens}} {...props} />
}
export { userContext };

export function useAuth() {
  return useContext(userContext);
};