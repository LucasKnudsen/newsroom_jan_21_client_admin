import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import LoginForm from './LoginForm'
import CreateForm from './CreateForm'

const MainView = () => {
  const { authenticated, message, name } = useSelector(state => state)

  return (
    <Grid centered columns={1} className="main-view">
      <Grid.Column verticalAlign="middle" width={10}>
        {!authenticated ? (
          <>
            <Header size="huge">Hello!</Header>
            <Header>Please login</Header>
            <LoginForm />
          </>
        ) : (
            <>
              <Header size="huge" data-cy="welcome-message">Welcome back {name}!</Header>
              {message && <p data-cy="message">{message}</p> }
              <CreateForm />
            </>
          )}
      </Grid.Column>
    </Grid>
  )
}
export default MainView