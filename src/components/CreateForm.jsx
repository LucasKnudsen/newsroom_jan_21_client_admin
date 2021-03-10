import React, { useState } from 'react'
import { Form, Grid, Modal, Segment, Input, TextArea, Button, Image, Select } from 'semantic-ui-react'
import { createArticle, getArticles } from '../modules/articleModules'
import { useSelector } from 'react-redux'

const CreateForm = () => {
  const [open, setOpen] = useState(false)
  const [selectValue, setSelectValue] = useState()
  const [thumbnail, setThumbnail] = useState()
  const { formMessage } = useSelector(state => state)

  const articleCreator = async (event, selectValue) => {
    let response = await createArticle(event, selectValue)
    response && setOpen(false)
    getArticles()
  }

  const categories = [
    { key: "news", value: "news", text: "News" },
    { key: "event", value: "event", text: "Event" },
    { key: "trip", value: "trip", text: "Trip" },
    { key: "food", value: "food", text: "Food" },
  ];

  return (
    <Modal
      onOpen={() => setOpen(true)}
      onClose={() => {
        setOpen(false)
        setThumbnail()
      }}
      open={open}
      trigger={<Button color="blue" data-cy="create-button">Create an article</Button>}
    >
      <Segment padded >
        <Form data-cy="create-form" onSubmit={(event) => articleCreator(event, selectValue)}>
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
                rows="5"
                label="Content"
                data-cy="body-field"
                control={TextArea}
                placeholder="Go nuts!"
              />
            </Grid.Column>
            <Grid.Column >
              <Form.Group inline >
                <input data-cy="article-type-field" type="radio" id="experience" name="article_type" value="experience" />
                <label for="experience">Experience</label>
                <input data-cy="article-type-field" type="radio" id="story" name="article_type" value="story" />
                <label for="story">Story</label>
              </Form.Group>
              <Form.Field
                onChange={(event) => setSelectValue(event.target.textContent)}
                name="category"
                options={categories}
                label="Category"
                data-cy="category-field"
                control={Select}
                placeholder="Select a category"
              />
              <Form.Field
                name="location"
                label="Location"
                data-cy="location-field"
                control={Input}
                placeholder="What location is the article regarding?"
              />
              <Form.Input
                style={{ overflow: 'auto' }}
                name="image"
                label="Upload an image"
                type="file"
                data-cy="image-field"
                onChange={(event) => { setThumbnail(event.target.files[0]) }}
              />
              {thumbnail && <Image data-cy="thumbnail" centered size="small" alt="thumbnail" src={URL.createObjectURL(thumbnail)} />}
              <Form.Button color="blue" data-cy="submit-button">Submit</Form.Button>
              {formMessage && <p data-cy="form-message">{formMessage}</p>}
            </Grid.Column>
          </Grid>
        </Form>
      </Segment>
    </Modal>
  )
}

export default CreateForm
