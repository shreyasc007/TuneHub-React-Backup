import React from "react";
import { Link } from "react-router-dom";

export default function Customerhome() {
  return (
    <div>
      <h2>Customer Home</h2>
      <Link to="/viewsongs">
        <h1>View Songs</h1>
      </Link>

      <div>
        <form action="pay">
          <input type="submit" value="GET PREMIUM" />
        </form>
        <br /> <br />
        <form action="logout">
          <input type="submit" value="LOGOUT" />
        </form>
      </div>
    </div>
  );
}
