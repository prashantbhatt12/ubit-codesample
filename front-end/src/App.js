import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import CreatePost from "./pages/CreatePost";
import HomePage from "./pages/HomePage";
import Posts from "./pages/Posts";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/profile">
          <UserProfile />
        </Route>
        <Route path="/allposts">
          <Posts userId={-1} />
        </Route>
        <Route path="/myposts">
          <Posts userId={265} />
        </Route>
        <Route path="/createPosts">
          <CreatePost />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
