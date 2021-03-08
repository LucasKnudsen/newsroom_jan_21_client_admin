import React, { useState } from 'react'
import { Grid, Header, Segment, Input, Button, Form } from 'semantic-ui-react'
import { signingIn } from '../modules/authenticationModules'

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState()

  const signInAdmin = async (event) => {
    let response = await signingIn(event)
    if (response) {
      setErrorMessage(response)
    }
  }

  return (
    <Grid className="login-modal" textAlign='center' verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header style={{ fontSize: 30 }} color='blue' textAlign='center'>
          GET CRACKIN'!
          </Header>
        <Form onSubmit={(event) => signInAdmin(event)} data-cy="registration-form" size="large">
          <Segment raised>
            <Form.Field
              name="email"
              data-cy="email-field"
              type="email"
              label="email"
              control={Input}
              placeholder="email"
              required
            />
            <Form.Field
              name="password"
              data-cy="password-field"
              type="password"
              label="password"
              control={Input}
              placeholder="password"
              required
            />
            <Button color="blue" data-cy="submit">Log in!</Button>
            <br />
            {errorMessage &&
              <p data-cy="error-message">{errorMessage}</p>
            }
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}
export default LoginForm
