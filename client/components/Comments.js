import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';

class CommentRow extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (this.props.isLocked) return;
    this.props.onDeleteClick(this.props.id, this.props.index);
  }
  renderLock() {
    const floatLeft = {
      float: 'left'
    };
    const backgroundColor = {
      backgroundColor: '#02A7D7'
    };
    return (
      <div className="icon-lock" style={floatLeft}>
        <div className="lock-top-1" style={backgroundColor}></div>
        <div className="lock-top-2"></div>
        <div className="lock-body" style={backgroundColor}></div>
        <div className="lock-hole"></div>
      </div>
    )
  }
  render() {
    return (
      <p>
        <strong>{this.props.author}</strong>
        {this.props.comment}
        <button className="remove-comment" onClick={this.handleClick}>
          {this.props.isLocked ? this.renderLock() : <span>&times;</span>}
        </button>
      </p>
    );
  }
}

class Comments extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.renderComment = this.renderComment.bind(this);
    this.state ={
      hasError: false
     };
  }

  renderComment(element, i) {
    return (
      <div className="comment" key={i}>
        <CommentRow
          {...element}
          index={i}
          onDeleteClick={this.handleDelete}
        />
      </div>
    )
  }

  handleDelete(id, index) {
    //e.preventDefault();
    const { photoId } = this.props.params;
    this._asyncRequest = axios
      .post('/api/deleteComment', {
        id
      })
      .then((payload) => {
        this._asyncRequest = null;
        // calling the dispatcher
        this.props.removeComment(photoId, index);
      })
      .catch(console.error);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { photoId } = this.props.params;
    const author = this.refs.author.value;
    const comment = this.refs.comment.value;
    if (!author || !comment) {
      if (author && !comment) { this.refs.comment.focus(); }
      this.setState({
        hasError: true
       })
      return;
    }
    this._asyncRequest = axios
      .post('/api/addComment', {
        photoId,
        author, 
        comment
      })
      .then((payload) => {
        this._asyncRequest = null;
        // calling the dispatcher
        this.props.addComment(photoId, author, comment, payload.data._id);
        // Clear comment text
        this.refs.comment.value = '';
      })
      .catch(console.error);
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }
  
  render() {
    const authorClass = classNames({
      'comment-invalid': this.state.hasError && !this.refs.author.value
    });
    const commentClass = classNames({
      'comment-invalid': this.state.hasError && !this.refs.comment.value
    });
    return (
      <div className="comments">
        {this.props.photoComments.map(this.renderComment)}
        <form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit}>
          <input type="text" className={authorClass} ref="author" placeholder="author"/>
          <input type="text" className={commentClass} ref="comment" placeholder="comment"/>
          <button type="submit" className="button-form">Send</button>
        </form>
      </div>
    )
  }
};

export default Comments;
