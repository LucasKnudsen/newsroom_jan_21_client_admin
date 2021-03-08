import React, { useEffect } from 'react'
import { Grid, Header, Image } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import LoginForm from './LoginForm'
import CreateForm from './CreateForm'
import Dashboard from './Dashboard'
import { validateToken } from '../modules/authenticationModules'
import logo from '../assets/logo.png'

const MainView = () => {
  const { authenticated, successMessage, name } = useSelector(state => state)

  useEffect(() => {
    validateToken()
  }, [authenticated])

  return (
    <Grid centered columns={1} className="main-view">
      <Grid.Column textAlign="center" verticalAlign="middle" width={10}>
        {!authenticated ? (
          <>
            <Image centered alt="logo" src={logo} style={{ width: 200 }} />
            <LoginForm />
          </>
        ) : (
            <>
              <Header style={{ fontSize: 35 }} color="blue" data-cy="welcome-message">Welcome back {name}!</Header>
              <CreateForm />
              {successMessage && <p data-cy="success-message">{successMessage}</p>}
              <Dashboard />
            </>
          )}
      </Grid.Column>
    </Grid>
  )
}
export default MainView