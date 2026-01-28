import { Link } from "react-router";

export default function WithoutProducts() {
  return (
    <>
      <h1>Ops, it looks like theres been an error</h1>
      <Link to='/'>Return to HomePage</Link>
    </>
  );
}
