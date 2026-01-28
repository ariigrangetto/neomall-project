import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  return (
    <>
      <h1>Profile</h1>
      <p>Welcome {user.username}</p>
      <Link to='/products'> return to homepage </Link>
    </>
  );
}
