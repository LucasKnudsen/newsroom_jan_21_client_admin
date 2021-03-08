import React, { useEffect } from 'react'
import { Segment, Item, Header} from 'semantic-ui-react'
import { getArticles } from '../modules/articleModules'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const { articles, dashboardMessage } = useSelector(state => state)

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
    <Segment textAlign="left" data-cy="dashboard-wrapper" >
      <Header dividing size="huge">Your Articles</Header>
      {dashboardMessage ? <p data-cy="message">{dashboardMessage}</p> : (
        <Item.Group divided style={{ overflow: 'auto', height: 350 }}>
          {articleList}
        </Item.Group>
      )}
    </Segment>
  )
}

export default Dashboard
