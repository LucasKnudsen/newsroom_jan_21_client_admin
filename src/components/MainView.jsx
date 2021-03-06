import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

export const CreateForm = () => {
  const { authenticated } = useSelector(state => state)
  return (
    <Grid>
      <Grid.Row>
        <Header size="massive">Welcome!</Header>
        {authenticated ? (
          <>
            <Header>Please login</Header>
            <LoginForm />
          </>
        ) : (
            <CreateForm />
          )}
      </Grid.Row>
    </Grid>
  )
}
