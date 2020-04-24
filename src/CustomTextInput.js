import React, { Component } from 'react';

// export default class CustomTextInput extends Component {
//   constructor(props) {
//     super(props);
//     // create a ref to store the textInput DOM element
//     this.textInput = React.createRef();
//     this.focusTextInput = this.focusTextInput.bind(this);
//   }

//   focusTextInput() {
//     // Explicitly focus the text input using the raw DOM API
//     // Note: we're accessing "current" to get the DOM node
//     this.textInput.current.focus();
//   }

//   render() {
//     // tell React that we want to associate the <input> ref
//     // with the `textInput` that we created in the constructor
//     return (
//       <div>
//         <input type="text" ref={this.textInput} />
//         <input
//           type="button"
//           value="Focus the text input"
//           onClick={this.focusTextInput}
//         />
//       </div>
//     );
//   }
// }

export default class CustomTextInput extends Component {
  constructor(props) {
    super(props);
    this.textInput = null;
  }

  //Set this.textInput to reference DOM node
  setTextInputRef = (element) => {
    console.log('DOM node: ', element);

    this.textInput = element;
  };

  focusTextInput = () => {
    // Focus the text input using the raw DOM API

    //If textInput exists, focus it

    if (this.textInput) {
      this.textInput.focus();
    }
  };

  // autofocus the input on mount
  componentDidMount() {
    this.focusTextInput();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <div>
        {/* ref attribute here is direct reference to raw DOM node */}
        {/* Similar to onChange */}
        <input type="text" ref={this.setTextInputRef} />

        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
