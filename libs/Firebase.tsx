import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { ReactNode, useReducer, createContext } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBpV9qj9iX8MmQoBGmwBgptt9u3rFNcYDU",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};
const projectsReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_PROJECT":
      return [...state, action.project];
    case "REMOVE_PROJECT":
      return state.filter((project: any) => project.id !== action.id);
    default:
      return state;
  }
};
export const ProjectsContext = createContext([] as any);
export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const [projects, dispatch] = useReducer(projectsReducer, []);

  return (
    <ProjectsContext.Provider value={{ projects, dispatch, auth, db }}>
      {children}
    </ProjectsContext.Provider>
  );
};
