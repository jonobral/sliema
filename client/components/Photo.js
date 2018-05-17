import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import moment from 'moment';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import dropboxController from '../../controllers/dropboxController';

class Photo extends Component {

  constructor (props) {
    super(props);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleIncrement(e) {
    e.preventDefault();
    // send to create or update records on database
    this._asyncRequest = axios
      .post('/api/addLike', {
        id: this.props.photo.id,
        name: this.props.photo.name, 
        likes: this.props.photo.likes + 1
      })
      .then((payload) => {
        this._asyncRequest = null;
        // calling the dispatcher
        this.props.increment(this.props.i, payload.data.likes, this.props.folderId);
      })
      .catch(console.error);
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    const { photo, i, comments } = this.props;
    return (
      <figure className="grid-figure">
        <div className="grid-photo-wrap">
          <Link to={`/${this.props.folderId}/${photo.id}`}>
            <img src={photo.path} alt={photo.name} className="grid-photo" />
          </Link>

          <CSSTransitionGroup transitionName="like"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            <span key={photo.likes} className="likes-heart">{photo.likes}</span>
          </CSSTransitionGroup>
        </div>

        <figcaption>
          <p>{moment(photo.created).format('MM-DD')}</p>
          <div className="control-buttons">
            <button onClick={this.handleIncrement} className="likes">&hearts; {photo.likes}</button>
            <Link className="button" to={`/${this.props.folderId}/${photo.id}`}>
              <span className="comment-count">
                <span className="speech-bubble"></span>
                {comments[photo.id] ? comments[photo.id].length : 0}
              </span>
            </Link>
          </div>
        </figcaption>
        
      </figure>
    )
  }
};

export default Photo;