import React, { createContext, useContext } from "react";

//create empty context object
const userContext = createContext({ user: {}})

export default userContext ;

export function useAuth() {
  return useContext(userContext);
};