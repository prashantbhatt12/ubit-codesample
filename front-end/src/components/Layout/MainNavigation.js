import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>UBTalks!</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/allposts">All Posts</Link>
          </li>
          <li>
            <Link to="/myposts">My Posts</Link>
          </li>
          <li>
            <Link to="/createPosts">Create Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
