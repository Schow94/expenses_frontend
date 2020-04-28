import React, { Component } from 'react';
import Dropzone from './Dropzone';
import './styles/Upload.css';
import Progress from './Progress';

const API_URL = process.env.REACT_APP_API_URL;

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  //Adds file from child file uploader to state represented as an array of files
  onFilesAdded(files) {
    this.setState({
      files: [this.state.files, ...files],
    });
  }

  // Upload files to browser
  //async because not sure how long it'll take
  async uploadFiles() {
    //Reset upload state before uploading new files
    this.setState({
      uploadProgress: {},
      uploading: true,
    });

    //Create arr of files
    const promises = [];
    this.state.files.forEach((file) => {
      // sendRequest is async since sending files to server
      promises.push(this.sendRequest(file));
    });

    try {
      // wait until all files have been added to arr
      await Promise.all(promises);

      // Once finished uploading, change successfullUploaded state
      this.setState({
        successfullUploaded: true,
        uploading: false,
      });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({
        successfullUploaded: true,
        uploading: false,
      });
    }
  }

  //Send files to server
  sendRequest(file) {
    //Each file being sent to the server  creates its own promise
    const token = JSON.parse(localStorage.getItem('token'));

    return new Promise((resolve, reject) => {
      //Create a new XHR upload obj
      const XHR = new XMLHttpRequest();
      const request = XHR.upload;

      // ------------- Event handlers here are simply to get progress for progress bar ------------------
      //Event listener added to track progress
      request.addEventListener('progress', (event) => {
        //Bool that checks if event has a length that can be calculated
        if (event.lengthComputable) {
          //Create obj called copy & store in state to keep track of progress
          const copy = { ...this.state.uploadProgress };

          //Each file will have it's progress updated in state from pending (0%) to done (100%)
          copy[file.name] = {
            state: 'pending',
            percentage: (event.loaded / event.total) * 100,
          };

          this.setState(
            {
              uploadProgress: copy,
            },
            () => {
              console.log(this.state.uploadProgress);
            }
          );
        }
      });

      //Event listener to check that files loaded (100%)
      request.addEventListener('load', (event) => {
        const copy = { ...this.state.uploadProgress };

        copy[file.name] = { state: 'done', percentage: 100 };

        this.setState({
          uploadProgress: copy,
        });

        resolve(XHR.response);
      });

      //Event listener to check for errors uploading files
      request.addEventListener('error', (event) => {
        const copy = { ...this.state.uploadProgress };

        copy[file.name] = { state: 'error', percentage: 0 };

        this.setState({
          uploadProgress: copy,
        });

        reject(XHR.response);
      });

      //Send files without a form
      const formData = new FormData();
      formData.append('file', file, file.name);

      //Creates a new or pre-existing POST request

      // XHR.open('POST', 'http://localhost:5000/expenses/upload');
      XHR.open('POST', `${API_URL}/expenses/upload`);

      //token is not being attached properly
      XHR.setRequestHeader('Authorization', 'Bearer ' + token);

      //Sends request to server
      XHR.send(formData);
      this.props.getAllExpenses();
    });
  }

  // Pull out upload status & render a display bar
  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];

    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />

          {uploadProgress ? `${uploadProgress.percentage.toFixed(0)}%` : 0}

          <img
            className="CheckIcon"
            alt="done"
            src="check.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === 'done' ? 0.5 : 0,
            }}
          />
        </div>
      );
    }
  }

  //Clear files so you can upload more
  clearFiles = () => {
    this.setState({
      files: [],
      successfullUploaded: false,
    });
  };

  // Renders a diff button depending if files were uploaded successfully or not
  renderActions() {
    // if files uploaded successfully, clear files arr/cache in state
    if (this.state.successfullUploaded) {
      return (
        <button className="clear-btn" onClick={this.clearFiles}>
          Clear
        </button>
      );
    }
    //If files not uploaded successfully yet, send files to server
    else {
      return (
        <button
          className="upload-btn"
          //Disable button if files are uploading or theres no files to upload yet
          disabled={this.state.files.length < 0 || this.state.uploading}
          // Clicking button triggers upload to server
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      );
    }
  }

  render() {
    return (
      <div className="Upload">
        <span className="Title">Upload Files</span>

        <div className="upload-container">
          <div className="import-instructions">
            <div className="import-title">
              <h3>CSV Import Instructions</h3>
              <hr></hr>
            </div>
            <ul className="import-list">
              <li className="import-list-item">File types accepted: CSV</li>
              <li className="import-list-item">
                Must have 5 columns: Expense, Price, Category, Paid To, Date, in
                that order
              </li>
              <li className="import-list-item">
                Do not use commas (,) when specifying dollar amounts. (e.g.
                $47,000 would be input as 47000)
              </li>
              <li className="import-list-item">
                Files will not upload if .csv contains incorrect characters in
                headers or if not formatted properly
              </li>
            </ul>
          </div>

          <div className="Content">
            <div className="dropzone-container">
              <Dropzone
                onFilesAdded={this.onFilesAdded}
                disabled={
                  this.state.uploading || this.state.successfullUploaded
                }
              />
            </div>

            {/* Map through files array to display to user what they selected for upload */}
            <div className="Files">
              {this.state.files.map((file, i) => {
                return (
                  <div key={i} className="Row">
                    <span className="Filename">{file.name}</span>
                    {this.renderProgress(file)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Button to trigger upload to server */}
        <div className="Actions">{this.renderActions()}</div>
      </div>
    );
  }
}
