"use client";
import { ProjectsContext } from "@/libs/Firebase";
import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
const Overview = () => {
  const { auth } = React.useContext(ProjectsContext);
  const [signOut, loading, error] = useSignOut(auth);
  const router = useRouter();
  return <main></main>;
};

export default Overview;
// async () => {
//   signOut()
//     .then((res) => {
//       if (res) {
//         router.push("/auth/signin");
//       }
//     })
//     .catch((err) => {
//       alert(err.message);
//     });
// }
