import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
        <li>
          <Link to="/store">store</Link>
        </li>
        <li>
          <Link to="/team">team</Link>
        </li>
      </ul>
    </>
  );
}
