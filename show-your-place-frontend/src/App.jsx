import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import { useAuth } from './shared/hooks/auth-hook'
import React, { Suspense } from 'react'

import MainNavigation from './shared/components/Navigation/MainNavigation'

import { AuthContext } from './shared/context/auth-context'
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner'

const Users = React.lazy(() => import('./user/containers/Users'))
const NewPlace = React.lazy(() => import('./places/containers/NewPlace'))
const UserPlaces = React.lazy(() => import('./places/containers/UserPlaces'))
const UpdatePlace = React.lazy(() => import('./places/containers/UpdatePlace'))
const Auth = React.lazy(() => import('./user/containers/Auth'))

const App = () => {
  const { login, logout, token, userId } = useAuth()
  let routes

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    )
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  )
}
export default App
