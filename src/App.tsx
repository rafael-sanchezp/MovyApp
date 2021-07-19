import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from 'views/home';
import Login from 'views/login';
import MyList from 'views/myList';
import Menu from 'components/menu';
import Profile from 'views/profile';
import Footer from 'components/footer';

const App = () => (
  <Router>
    <div className="flex flex-col h-full">
      <Menu />
      <Switch>
        <Route exact path={['/login', '/']}>
          <Login />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/my-list">
          <MyList />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default App;
