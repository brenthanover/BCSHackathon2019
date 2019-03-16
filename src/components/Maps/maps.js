import React from 'react';

export default class Maps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Go click the button!'
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(text) {
    this.setState({ text: text });
  }

  render() {
    return (
      <div>
        <h1>Maps Page</h1>
        <button onClick={() => this.handleClick('You clicked the button!')}>Click me!</button>
        <p>Text: {this.state.text}</p>
      </div>
    )
  }
}
