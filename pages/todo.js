import { ProtectRoute } from "../hoc/ProtectRoute";
function Todo() {
  return (
    <>
      <h1>Todo Page</h1>
      <p>this page is protected!</p>
    </>
  );
}

export default ProtectRoute(Todo);
