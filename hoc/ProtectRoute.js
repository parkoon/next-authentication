import { useRouter } from "next/router";
import useAuth from "../contexts/auth";
import { useEffect } from "react";

export function ProtectRoute(Component) {
  return () => {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();

    if (loading) return <h1>loading...</h1>;

    if (!isAuthenticated && !loading) return <h1>Get out of here</h1>;

    return <Component {...arguments} />;
  };
}
