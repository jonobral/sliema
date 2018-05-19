import React, { Component } from 'react';
import Photo from './Photo';
import Comments from './Comments';
import Spinner from './Spinner';
import axios from 'axios';
import dropboxController from '../../controllers/dropboxController';

class Single extends Component {

  constructor(props) {
    super(props);
  }

  createPhotos(payload) {
    return axios.post('/api/createPhotos', payload);
  }

  getComments(payload) {
    return axios.get('/api/getComments')
  }

  componentDidUpdate(prevProps) {
    const { folderId } = this.props.params;
    if ((!prevProps.folders || prevProps.folders.length == 0) && this.props.folders) {
      this.fetchPhotos(folderId);
    }
  }

  fetchPhotos(folderId) {
    // index of the folder
    const folderIndex = this.props.folders.findIndex((folder) => folder.id === folderId);
    const { path: folderPath } = this.props.folders[folderIndex];
    if (!this.props.photos[folderId]) {
      this._asyncRequest = dropboxController.getPhotos({folder: folderPath})
        .then((payload) => {
          this._asyncRequest = null;
          if (!payload.length) { 
            this.props.displayError('NO_PHOTOS', 'Photo does not exist!');
            return;
          }
          this._asyncRequest = axios.all([this.createPhotos(payload), this.getComments()])
            .then(axios.spread((photos, comments) => {
              this._asyncRequest = null;
              this.props.fetchDatabaseRecords(photos.data, folderId);
              this.props.addInitialComments(comments.data);
            }))
            .catch(console.error);;
        }
      );
    }
  }

  render() {
    const { folderId, photoId } = this.props.params;
    let index = 0;
    let photo = null;
    if (this.props.photos[folderId]) {
      // index of the photo
      index = this.props.photos[folderId].findIndex((photo) => photo.id === photoId);
      photo = this.props.photos[folderId][index];
    }

    const photoComments = this.props.comments[photoId] || [];

    // get us the photo or spinner
    return (
      photo ? <div className="single-photo">
        <Photo key={index} i={index} photo={photo} {...this.props} folderId={folderId}/>
        <Comments photoComments={photoComments} {...this.props}/>
      </div> :
        <Spinner />
    )
  }
};

export default Single;