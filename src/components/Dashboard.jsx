import React, {useEffect} from 'react'
import { Segment, Item, Button, Header } from 'semantic-ui-react'
import {getArticles} from '../modules/articleModules'

const Dashboard = () => {

  useEffect(() => {
    getArticles()
  }, [])

  let articleList

  return (
    <Segment>
      <Header>Your Articles:</Header>
      {articleList}
    </Segment>
  )
}

export default Dashboard
