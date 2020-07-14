import { ProtectRoute } from "../hoc/ProtectRoute";
import useAuth from "../contexts/auth";
import { Button } from "@material-ui/core";
function Profile() {
  const { user, logout, loading } = useAuth();

  return (
    <>
      <h1>Profile Page</h1>
      <p>this page is protected!</p>
      <h3>User Info</h3>
      <p>{JSON.stringify(user, null, 4)}</p>
      <Button variant="contained" color="primary" onClick={logout}>
        Sign Out
      </Button>
    </>
  );
}

export default ProtectRoute(Profile);
