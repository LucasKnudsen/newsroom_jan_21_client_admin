import React, { useEffect } from 'react'
import { Segment, Item, Header } from 'semantic-ui-react'
import { getArticles } from '../modules/articleModules'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const { articles, dashboard_message } = useSelector(state => state)

  useEffect(() => {
    getArticles()
  }, [])

  let articleList
  if (articles) {
    articleList = articles.map((article, i) => {
      return (
        <Item data-cy="article-item" data-id={`article-item-${i + 1}`} key={i + 1}>
          <Item.Content>
            <Item.Header data-cy="title">{article.title}</Item.Header>
            <Item.Meta data-cy="updated">Last updated: {article.date}</Item.Meta>
          </Item.Content>
        </Item>
      )
    })
  }

  return (
    <Segment textAlign="left" data-cy="dashboard-wrapper">
      <Header>Your Articles:</Header>
      {dashboard_message ? <p data-cy="message">{dashboard_message}</p> : (
        <Item.Group divided>
          {articleList}
        </Item.Group>
      )}
    </Segment>
  )
}

export default Dashboard

// Get some data
// Store this data (either local state, application state)
// Take this data and display it in an Items list