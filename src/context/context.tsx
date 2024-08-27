import { createContext, ReactNode, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import { User } from "../types/user";

const initialState: { user: User | null } = {
  user: null,
};

if (localStorage.getItem("token")) {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode<User>(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    // Cast the decoded token to the User type
    initialState.user = {
      ...decodedToken,
      token, // Add the token back if you need to store it
    };
  }
}

const AuthContext = createContext<{
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}>({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(
  state: typeof initialState,
  action: { type: string; payload?: User }
) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: User) => {
    localStorage.setItem("token", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  function logout() {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  }

  return (
    // <AuthContext.Provider
    //   value={{ user: state.user, login, logout }}
    //   {...props}
    // />
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

// import { createContext, useReducer } from "react";
// import { jwtDecode } from "jwt-decode";

// const initialState = {
//   user: null,
// };

// if (localStorage.getItem("token")) {
//   const decodedToken = jwtDecode(localStorage.getItem("token"));
//   if (decodedToken.exp * 1000 < Date.now()) {
//     localStorage.removeItem("token");
//   } else {
//     initialState.user = decodedToken;
//   }
// }

// const AuthContext = createContext({
//   user: null,
//   login: (userData) => {},
//   logout: () => {},
// });

// function authReducer(state, action) {
//   switch (action.type) {
//     case "LOGIN":
//       return {
//         ...state,
//         user: action.payload,
//       };
//     case "LOGOUT":
//       return {
//         ...state,
//         user: null,
//       };
//     default:
//       return state;
//   }
// }

// function AuthProvider(props) {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   const login = (userData) => {
//     localStorage.setItem("token", userData.token);
//     dispatch({
//       type: "LOGIN",
//       payload: userData,
//     });
//   };

//   function logout() {
//     localStorage.removeItem("token");
//     dispatch({ type: "LOGOUT" });
//   }

//   return (
//     <AuthContext.Provider
//       value={{ user: state.user, login, logout }}
//       {...props}
//     />
//   );
// }

// export { AuthContext, AuthProvider };
