import React, { Component } from 'react';
import Dropzone from './Dropzone';
import './styles/Upload.css';
import Progress from './Progress';

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

  onFilesAdded(files) {
    this.setState((prevState) => ({
      files: [this.state.files, ...files],
    }));
    console.log(files);
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach((file) => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  //Convert this to axios later
  sendRequest(file) {
    return new Promise((resolve, reject) => {
      //Create a new XHR upload obj
      const XHR = new XMLHttpRequest().upload;

      //Event listener added to track progress
      XHR.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: 'pending',
            percentage: (event.loaded / event.total) * 100,
          };
          this.setState({ uploadProgress: copy });
        }
      });

      //Event listener to check that files loaded
      XHR.addEventListener('load', (event) => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: 'done', percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(XHR.response);
      });

      //Event listener to check for errors uploading files
      XHR.addEventListener('error', (event) => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: 'error', percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(XHR.response);
      });

      //Send files without a form
      const formData = new FormData();
      formData.append('file', file, file.name);

      //Creates a new or pre-existing POST request
      XHR.open('POST', 'http://localhost:5000/expenses/upload');

      //Sends request to server
      XHR.send(formData);
    });
  }

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

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          onClick={() =>
            this.setState({ files: [], successfullUploaded: false })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={this.state.files.length < 0 || this.state.uploading}
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
        {/* <span className="Title">Upload Files</span> */}
        <div className="Content">
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
          </div>
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
        <div className="Actions">{this.renderActions()}</div>
      </div>
    );
  }
}
