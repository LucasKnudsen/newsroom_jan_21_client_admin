import React from 'react'
import { Form, Grid, Segment, Input, TextArea } from 'semantic-ui-react'
import { createArticle } from '../modules/articleModules'

const CreateForm = () => {

  return (
    <Segment>
      <Form data-cy="create-form" onSubmit={(event) => createArticle(event)}>
        <Grid columns={2}>
          <Grid.Column>
            <Form.Field
              name="title"
              label="Title"
              data-cy="title-field"
              control={Input}
              placeholder="My Awesome Title"
            />
            <Form.Field
              name="teaser"
              label="Teaser"
              data-cy="teaser-field"
              control={TextArea}
              placeholder="Best damn article ever?"
            />
            <Form.Field
              name="body"
              label="Content"
              data-cy="body-field"
              control={TextArea}
              placeholder="Go nuts!"
            />
          </Grid.Column>
          <Grid.Column verticalAlign="middle">
            <Form.Group inline >
              <input data-cy="article-type-field" type="radio" id="experience" name="article_type" value="experience" />
              <label for="experience">Experience</label>
              <input data-cy="article-type-field" type="radio" id="story" name="article_type" value="story" />
              <label for="story">Story</label>

            </Form.Group>
            <Form.Field
              name="category"
              label="Category"
              data-cy="category-field"
              control={Input}
              placeholder="Food, news, events.."
            />
            <Form.Field
              name="location"
              label="Location"
              data-cy="location-field"
              control={Input}
              placeholder="What location is the article regarding?"
            />
            <Form.Button color="brown" data-cy="submit-button">Submit</Form.Button>
          </Grid.Column>
        </Grid>
      </Form>
    </Segment>
  )
}

export default CreateForm
