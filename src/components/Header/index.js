/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unknown-property */
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {IoCloseCircle} from 'react-icons/io5'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FaSearch} from 'react-icons/fa'
import SearchContext from '../../context/SearchContext'
import './index.css'

class Header extends Component {
  state = {
    isOpen: false,
    searchBarVisible: false,
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  toggleHamburgerMenu = () => {
    this.setState(prevState => ({isOpen: !prevState.isOpen}))
  }

  toggleSearchBar = () => {
    this.setState(prevState => ({
      searchBarVisible: !prevState.searchBarVisible,
    }))
  }

  render() {
    const {isOpen, searchBarVisible} = this.state

    return (
      <SearchContext.Consumer>
        {value => {
          const {
            searchText,
            resetSearchButton,
            setSearchButton,
            updateLoading,
            upDateSearchText,
            setPostsData,
            setFailure,
            resetFailure,
          } = value

          const changeSearchText = event => {
            const newSearchText = event.target.value
            upDateSearchText(newSearchText)
          }

          const getUserSearchPosts = async () => {
            updateLoading()
            const jwtToken = Cookies.get('jwt_token')
            const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchText}`
            const options = {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
              method: 'GET',
            }
            const response = await fetch(apiUrl, options)
            const data = await response.json()
            if (response.ok === true) {
              const updatedData = data.posts.map(eachPost => ({
                postId: eachPost.post_id,
                createdAt: eachPost.created_at,
                likesCount: eachPost.likes_count,
                comments: eachPost.comments,
                userId: eachPost.user_id,
                profilePic: eachPost.profile_pic,
                userName: eachPost.user_name,
                postCaption: eachPost.post_details.caption,
                postImage: eachPost.post_details.image_url,
              }))
              updateLoading()
              resetSearchButton()
              setPostsData(updatedData)
              setSearchButton()
              resetFailure()
            } else {
              updateLoading()
              setFailure()
              setSearchButton()
            }
          }

          return (
            <nav>
              <div className="large-container">
                <div className="title-container">
                  <Link to="/">
                    <img
                      src="https://res.cloudinary.com/dziwdneks/image/upload/v1675419223/login_icon_ekrs85.png"
                      className="login-website-logo-image"
                      alt="website logo"
                    />
                  </Link>
                  <h1 className="title-heading">Insta Share</h1>
                </div>
                <div className="links-search-container">
                  <div className="search-container">
                    <input
                      value={searchText}
                      onChange={changeSearchText}
                      className="search-bar"
                      type="search"
                      placeholder="Search Caption"
                    />
                    <button
                      onClick={getUserSearchPosts}
                      className="search-button"
                      type="button"
                      testid="searchIcon"
                    >
                      <FaSearch className="search-icon" />
                    </button>
                  </div>
                  <ul className="navbar">
                    <Link to="/" className="nav-item">
                      <li>Home</li>
                    </Link>
                    <Link to="/my-profile" className="nav-item">
                      <li>Profile</li>
                    </Link>
                  </ul>
                  <button
                    onClick={this.onClickLogout}
                    type="button"
                    className="logout-button"
                  >
                    Logout
                  </button>
                </div>
              </div>
              <div className="mobile-container">
                <div className="top-container">
                  <div className="title-container">
                    <Link to="/">
                      <img
                        src="https://res.cloudinary.com/dziwdneks/image/upload/v1675419223/login_icon_ekrs85.png"
                        className="login-website-logo-image"
                        alt="website logo"
                      />
                    </Link>
                    <h1 className="title-heading">Insta Share</h1>
                  </div>
                  <button
                    onClick={this.toggleHamburgerMenu}
                    testid="hamburgerIcon"
                    className="hamburger-button"
                    type="button"
                  >
                    <GiHamburgerMenu className="hamburger-icon" />
                  </button>
                </div>
                {isOpen && (
                  <div className="links-container">
                    <ul className="navbar">
                      <Link to="/" className="nav-item">
                        <li>Home</li>
                      </Link>
                      <Link to="/my-profile" className="nav-item">
                        <li>Profile</li>
                      </Link>
                      <li onClick={this.toggleSearchBar}>Search</li>
                    </ul>
                    <button
                      onClick={this.onClickLogout}
                      type="button"
                      className="logout-button"
                    >
                      Logout
                    </button>
                    <button
                      onClick={this.toggleHamburgerMenu}
                      type="button"
                      className="hamburger-button"
                    >
                      <IoCloseCircle className="hamburger-icon" />
                    </button>
                  </div>
                )}
                {searchBarVisible && (
                  <div className="search-container">
                    <input
                      value={searchText}
                      onChange={changeSearchText}
                      className="search-bar"
                      type="search"
                      placeholder="Search Caption"
                    />
                    <button
                      onClick={getUserSearchPosts}
                      className="search-button"
                      type="button"
                      testid="searchIcon"
                    >
                      <FaSearch className="search-icon" />
                    </button>
                  </div>
                )}
              </div>
            </nav>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default withRouter(Header)
