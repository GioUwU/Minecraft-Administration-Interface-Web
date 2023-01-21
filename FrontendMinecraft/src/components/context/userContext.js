import { createContext } from "react";

const UserContext = createContext({
    user: null,
    login: (data) => {},
    logout: () => {},
});

export default UserContext;