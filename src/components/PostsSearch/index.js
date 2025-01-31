/* eslint-disable react/no-unknown-property */
import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'
import {FcLike} from 'react-icons/fc'
import SearchContext from '../../context/SearchContext'
import './index.css'

const PostsSearch = props => (
  <SearchContext.Consumer>
    {value => {
      const {initiateSearchPostLikeApi} = value

      const {eachPost} = props
      const {comments, postId, likesCount, message} = eachPost
      const updatedComments = comments.map(eachComment => ({
        comment: eachComment.comment,
        commentUserId: eachComment.user_id,
        commentUserName: eachComment.user_name,
      }))
      const isLiked = message === 'Post has been liked'

      const postLikeApi = () => {
        initiateSearchPostLikeApi(postId, true)
      }

      const postUnLikeApi = () => {
        initiateSearchPostLikeApi(postId, false)
      }

      return (
        <li key={eachPost.postId} className="post-item-container">
          <div className="profile-container">
            <img
              src={eachPost.profilePic}
              alt="post author profile"
              className="profile-pic"
            />
            <Link to={`/users/${eachPost.userId}`}>
              <p className="profile-name">{eachPost.userName}</p>
            </Link>
          </div>
          <img src={eachPost.postImage} alt="post" className="post-image" />
          <div className="social-container">
            {isLiked ? (
              <button
                onClick={postUnLikeApi}
                testid="unLikeIcon"
                type="button"
                className="icon-button"
              >
                <FcLike className="like-icon" />
              </button>
            ) : (
              <button
                onClick={postLikeApi}
                testid="likeIcon"
                type="button"
                className="icon-button"
              >
                <BsHeart className="icon" />
              </button>
            )}

            <button testid="commentIcon" type="button" className="icon-button">
              <FaRegComment className="icon" />
            </button>
            <button testid="shareIcon" type="button" className="icon-button">
              <BiShareAlt className="icon" />
            </button>
          </div>
          <p className="likes">{likesCount} likes</p>
          <p className="caption">{eachPost.postCaption}</p>
          <ul className="comments-container">
            {updatedComments.map(eachComment => (
              <li className="comment-item" key={eachComment.commentUserId}>
                <Link to={`/users/${eachComment.commentUserId}`}>
                  <span className="comment-user-name">
                    {eachComment.commentUserName}
                  </span>
                </Link>
                <p className="comment">{eachComment.comment}</p>
              </li>
            ))}
          </ul>
          <p className="created-at">{eachPost.createdAt}</p>
        </li>
      )
    }}
  </SearchContext.Consumer>
)

export default PostsSearch
