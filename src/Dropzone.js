import React, { Component } from 'react';
import './styles/Dropzone.css';

export default class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { hightlight: false };
    this.fileInputRef = React.createRef();

    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  //Opens file dialog
  openFileDialog() {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  }

  onFilesAdded(e) {
    if (this.props.disabled) return;

    if (this.props.onFilesAdded) {
      //Adds files to an array
      const array = this.fileListToArray(e.target.files);

      //Pass array to parent component
      this.props.onFilesAdded(array);
    }
  }

  //Adds all files to an arr so it's easier to handle
  fileListToArray(list) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  // ----------------------------------------- DRAG FUNCTIONS ----------------------------------------------

  onDragOver(event) {
    event.preventDefault();
    if (this.props.disabed) return;
    this.setState({
      hightlight: true,
    });
  }

  onDragLeave(event) {
    this.setState({
      hightlight: false,
    });
  }

  onDrop(e) {
    e.preventDefault();
    if (this.props.disabed) return;

    if (this.props.onFilesAdded) {
      this.props.onFilesAdded(this.fileListToArray(e.dataTransfer.files));
    }

    this.setState({
      hightlight: false,
    });
  }

  render() {
    return (
      <div
        className={`Dropzone ${this.state.hightlight ? 'Highlight' : ''}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{
          cursor: this.props.disabled ? 'default' : 'pointer',
        }}
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          multiple
          onChange={this.onFilesAdded}
        />
        <img alt="upload" className="Icon" src="cloud-upload.svg" />
        <span>Upload Files</span>
      </div>
    );
  }
}
