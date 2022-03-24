import React from 'react';
import axios from 'axios'

constructor() {
  this.state{
    
  }
  
}

handleInput = (e) => {
  this.setState({
    cityData: e.target.value
  })
}

handleSubmit =() => async{
  e.preventDefault();
  let cityData = await axios.get();
}

render () {
  return (
    <>
    <h1>SOme texxt</h1>
    <form>
      <input type='text' onInput={this.handleInput}/>
       <button type='submit'>
        some text
       </button>
      
      
    </form>
    
    </>
  )
}