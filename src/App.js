
import './App.css';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;

