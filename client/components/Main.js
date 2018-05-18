import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import dropboxController from '../../controllers/dropboxController';

const Footer = ({title}) => (<footer>{title}</footer>);

class Main extends Component {

  constructor(props) {
    super(props);
  }

  createFolders(payload) {
    return axios.post('/api/createFolders', payload);
  }

  componentDidMount() {
    this._asyncRequest = dropboxController.getFolders
      .then((payload) => {
        this._asyncRequest = this.createFolders(payload)
          .then((payload) => {
            this._asyncRequest = null;
            this.props.setFolders(payload.data);
          })
          .catch(console.error);
      }
    );
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    return (
      <div>
        <h1>
          <Link to="/">Eurotrip 2018</Link>
        </h1>
        {React.cloneElement(this.props.children, this.props)}
        <Footer title={<a href='http://jonobral.com' target='_blank'>By jonobral.com</a>}/>
      </div>
    )
  }
};

export default Main;