import { createContext, useContext } from "react";

//create empty context object
const userContext = createContext([null, () => {}])

export { userContext };

export function useAuth() {
  return useContext(userContext);
};