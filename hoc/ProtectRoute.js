import { useRouter } from "next/router";
import useAuth from "../contexts/auth";
import { useEffect } from "react";

export function ProtectRoute(Component) {
  return () => {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated && !loading) router.push("/login");
    }, [isAuthenticated, loading]);

    return <Component {...arguments} />;
  };
}
