import React, { Component } from 'react';
import Photo from './Photo';
import Comments from './Comments';
import Spinner from './Spinner';

class Single extends Component {
  render() {
    const { folderId, photoId } = this.props.params;
    // index of the photo
    const i = this.props.photos[folderId].findIndex((photo) => photo.id === photoId);
    const photo = this.props.photos[folderId][i];

    const photoComments = this.props.comments[photoId] || [];

    // get us the photo or spinner
    return (
      photo ? <div className="single-photo">
        <Photo key={i} i={i} photo={photo} {...this.props} folderId={folderId}/>
        <Comments photoComments={photoComments} {...this.props}/>
      </div> :
        <Spinner />
    )
  }
};

export default Single;