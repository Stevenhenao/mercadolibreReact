import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client';
class NameForm extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    let productName = this.state.value.replaceAll(' ','&');
    let url = 'https://api.mercadolibre.com.co/sites/MCO/search?q='+productName;
    fetch(url)
    .then(response => console.log(response))
    alert('A name was submitted: ' + url);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          steven henao <br />
        </label>
       
        <label>
          Producto:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default NameForm;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NameForm />);
