import React, { useState } from 'react'
import { Form, Grid, Modal, Segment, Input, TextArea, Button, Image, Select } from 'semantic-ui-react'
import { updateArticle, getArticles } from '../modules/articleModules'
import { useSelector } from 'react-redux'

// Write test
// Configure the request / potentially we dont need to send anything, we pass down with props
// Prefill the form
// Fix the styling

const EditForm = ({ article }) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(article.title)
  const [teaser, setTeaser] = useState(article.teaser)
  const [body, setBody] = useState(article.body)
  const [articleType, setArticleType] = useState(article.article_type)
  const [selectValue, setSelectValue] = useState(article.category)
  const [location, setLocation] = useState(article.location)
  const [thumbnail, setThumbnail] = useState(article.image)
  const { formMessage } = useSelector(state => state)

  const articleEditor = async (event, selectValue, id) => {
    let response = await updateArticle(event, selectValue, id)
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
      trigger={<Button color="blue" data-cy="edit-button">Edit</Button>}
    >
      <Segment padded >
        <Form data-cy="edit-form" onSubmit={(event) => articleEditor(event, selectValue, article.id)}>
          <Grid columns={2}>
            <Grid.Column>
              <Form.Field
                name="title"
                label="Title"
                data-cy="title-field"
                control={Input}
                placeholder="My Awesome Title"
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
              <Form.Field
                name="teaser"
                label="Teaser"
                data-cy="teaser-field"
                control={TextArea}
                placeholder="Best damn article ever?"
                value={teaser}
                onChange={event => setTeaser(event.target.value)}
              />
              <Form.Field
                name="body"
                content={body}
                rows="5"
                label="Content"
                data-cy="body-field"
                control={TextArea}
                placeholder="Go nuts!"
                value={body}
                onChange={event => setBody(event.target.value)}
              />
            </Grid.Column>
            <Grid.Column >
              <Form.Group inline >
                <input data-cy="article-type-field" type="radio" id="experience" name="article_type" value="experience" checked={articleType === 'experience'} onChange={event => setArticleType(event.target.value)} />
                <label for="experience">Experience</label>
                <input data-cy="article-type-field" type="radio" id="story" name="article_type" value="story" checked={articleType === 'story'} onChange={event => setArticleType(event.target.value)} />
                <label for="story">Story</label>
              </Form.Group>
              <Form.Field
                name="category"
                options={categories}
                label="Category"
                data-cy="category-field"
                control={Select}
                placeholder="Select a category"
                value={selectValue.toLowerCase()}
                onChange={(event) => setSelectValue(event.target.textContent)}
              />
              <Form.Field
                name="location"
                label="Location"
                data-cy="location-field"
                control={Input}
                placeholder="What location is the article regarding?"
                value={location}
                onChange={event => setLocation(event.target.value)}
              />
              <Form.Input
                style={{ overflow: 'auto' }}
                name="image"
                label="Upload an image"
                type="file"
                data-cy="image-field"
                onChange={(event) => { setThumbnail(event.target.files[0]) }}
              />
              {typeof thumbnail === 'object' && <Image data-cy="thumbnail" centered size="small" alt="thumbnail" src={URL.createObjectURL(thumbnail)} />}
              {typeof thumbnail === 'string' && <Image data-cy="thumbnail" centered size="small" alt="thumbnail" src={thumbnail} />}

              <Form.Button color="blue" data-cy="submit-button">Update</Form.Button>
              {formMessage && <p data-cy="form-message">{formMessage}</p>}
            </Grid.Column>
          </Grid>
        </Form>
      </Segment>
    </Modal>
  )
}

export default EditForm
