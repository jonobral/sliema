import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Photo from './Photo';
import Spinner from './Spinner';
import axios from 'axios';
import dropboxController from '../../controllers/dropboxController';

class PhotoGrid extends Component {

  constructor(props) {
    super(props);
    this.state = { tabIndex: 0 };
  }

  createPhotos(payload) {
    return axios.post('/api/createPhotos', payload);
  }

  getComments(payload) {
    return axios.get('/api/getComments')
  }

  componentDidUpdate(prevProps) {
    if ((!prevProps.folders || prevProps.folders.length == 0) && this.props.folders) {
      this.fetchPhotos(this.state.tabIndex);
    }
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  fetchPhotos(tabIndex) {
    const { id: folderId, path: folderPath } = this.props.folders[tabIndex];
    if (!this.props.photos[folderId]) {
      this._asyncRequest = dropboxController.getPhotos({folder: folderPath})
        .then((payload) => {
          this._asyncRequest = null;
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
    const { id: folderId, name: folderName } = this.props.folders[this.state.tabIndex] || {id: -1};
    return (
      this.props.folders ? 
      <Tabs defaultIndex={this.state.tabIndex} onSelect={(tabIndex) => this.setState({ tabIndex }, this.fetchPhotos(tabIndex))}>
        <TabList className="tabs">
          {this.props.folders.map((folder, i) => 
            <Tab key={i}>{folder.name}</Tab>
          )}
        </TabList>
        {this.props.folders.map((folder, folderIndex) => 
          <TabPanel key={folderIndex}>
            <div className="photo-grid">
              {this.props.photos[folderId] ? 
                this.props.photos[folderId].map((photo, i) => 
                  <Photo 
                    {...this.props}
                    key={i}
                    i={i}
                    photo={photo}
                    folderId={folderId}
                  />)
                : <Spinner />}
                </div>
          </TabPanel>
        )}
      </Tabs>  
      : <Spinner />
    )
  }
};

export default PhotoGrid;