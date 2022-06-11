
import React from 'react'
import ReactDOM from 'react-dom/client';
class NameForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      query: '',
      results: [],
      page: undefined,
      totalPages: undefined,
      loading: false

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handlePage = (page) => {
    this.setState({ page: page})
    this.setState({ loading: true})
    fetch("https://api.mercadolibre.com/sites/MCO/search?q="+this.state.query+"&offset="+page).then(res => res.json()).then(data => {
      this.setState({ results: data.results})
      this.setState({ loading: false})
    })
  }

  handleSubmit(event) {
    this.setState({ loading: true})
    fetch("https://api.mercadolibre.com/sites/MCO/search?q="+this.state.query).then(res => res.json()).then(data => {
      console.log(this.state.query)
      this.setState({ results: data.results})
      this.setState({ totalPages: data.paging.limit})
      this.setState({ page: 0})
      this.setState({ loading: false})
    })
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
         <div className="Busqueda">
      <p>Steven Henao Mejia</p>
      <input type="text" placeholder='Buscar Producto' value={this.state.query} onChange={(event)=>{
        this.setState({ query: event.target.value})
      }}/>
      <button type="button" onClick={this.handleSubmit}>buscar</button>
      </div>
        {    this.state.totalPages &&  
      <div className="Paginator">
        {this.state.page > 0 && 
          <button type="button" onClick={()=>{this.handlePage(this.state.page-1)}}>Anterior</button>}
          <p>{this.state.page}</p>
        {this.state.page < this.state.totalPages &&
          <button type="button" onClick={()=>{this.handlePage(this.state.page+1)}}>Siguiente</button>}
      </div>}
      {this.state.loading ? 
      <p>Cargando ...</p> :
      <div className="Results">
        {this.state.results.map(result => (
          <div className='Card' key={result.id}>
            <img src={result.thumbnail} alt={result.title}/>
            <div className='description'>
              <p>{result.title}</p>
              <p>{result.price} COP</p>
              <a href={result.permalink}>mas informacion</a>
            </div>
          </div>))}
      </div>}
    </div>  
    );
  }
}
export default NameForm;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NameForm />);
