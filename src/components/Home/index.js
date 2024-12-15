import {Component} from 'react'
import Header from '../Header'
import UserStories from '../UserStories'

import UserPosts from '../UserPosts'
import SearchContext from '../../context/SearchContext'

class Home extends Component {
  render() {
    return (
      <SearchContext.Consumer>
        {value => {
          const {searchPosts, searchText} = value
          return (
            <div className="home_container">
              <Header />
              {searchText === '' && <UserStories />}
              <UserPosts searchPosts={searchPosts} />
            </div>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}
export default Home
