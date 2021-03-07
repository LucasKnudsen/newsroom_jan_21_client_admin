import React, { useState } from 'react'
import { Grid, Modal, Header, Segment, Input, Button, Form } from 'semantic-ui-react'
import { signingIn } from '../modules/authenticationModules'

const LoginForm = () => {
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const signInAdmin = async (event) => {
    let response = await signingIn(event)
    if (response) {
      setErrorMessage(response)
    } else {
      setOpen(false)
    }
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="brown" data-cy="sign-in-button">Log in</Button>}
    >
      <Grid className="login-modal" textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header style={{ fontSize: 40}}color='brown' textAlign='center'>
            GET CRACKIN'!
          </Header>
          <Form onSubmit={(event) => signInAdmin(event)} data-cy="registration-form" size="large">
            <Segment>
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
              <Button color="brown" data-cy="submit">Log in!</Button>
              <br />
              {errorMessage &&
                <p data-cy="error-message">{errorMessage}</p>
              }
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </Modal>
  )
}
export default LoginForm
