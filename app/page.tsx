"use client";
import React from "react";
import { ProjectsContext } from "@/libs/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
const page = () => {
  const { auth } = React.useContext(ProjectsContext);
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  React.useEffect(() => {
    if (user) {
      router.push("/dashboard/overview");
    }
  }, [user]);
  if (loading) return <div>loading..</div>;
  if (error) return <div>error..</div>;
};

export default page;
