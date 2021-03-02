import React,{Component} from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './app.css';


class listMain extends Component{
  constructor(props) {
    super(props);

    this.state = {
       venues:[],
       category:[]
    };
  }

  
  componentDidMount(){
    this.getVenues();
    this.getCategories();
  }

  buttonList = (event) => {
    event.preventDefault()
      this.getVenues(event.target.value)
  }

  getCategories= () => {
    const endPoint="https://api.foursquare.com/v2/venues/categories?"
    const params={
      client_id: "G2GGRQBT2RGAAZW0YLI15FJGWL2VTL32ZBTJMTMRUIXY1NRS",
      client_secret: "HWM04PDRDX2MC3EIYOQ0Q30PIDJLDNM1DIKBQW3L2PJOLX4W",
        v: "20182507",
        locale:"en"
    }

  axios.get(endPoint + new URLSearchParams(params))
  .then(response => {
    this.setState({
        category: response.data.response.categories      
    })  
  })}

  getVenues=(category_name)=>{
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const params = {
      client_id: "G2GGRQBT2RGAAZW0YLI15FJGWL2VTL32ZBTJMTMRUIXY1NRS",
      client_secret: "HWM04PDRDX2MC3EIYOQ0Q30PIDJLDNM1DIKBQW3L2PJOLX4W",
      ll: "35.8997,14.5147",
      query: `${category_name}`,
      v: "20182507",
      near: "valletta"
    };
    axios.get(endPoint+ new URLSearchParams(params)).then(response=>{
      this.setState({venues: response.data.response.groups[0].items})
    })
}


  render(){


    const categoriesName=this.state.category.map(category =>{
        return (         
            <Button variant="primary" id="btn" value={category.name} onClick={this.buttonList} >{category.name}</Button>                   
        )
      } 
      )
      
          
    const venuesList = this.state.venues.map(venues=>{
        return(
          <div className="list-wrapper">
        <li className="listvenues"> {venues.venue.name} - Location: {venues.venue.location.address}
        </li> </div>)
      })
    
    return (
       <main>
         <div id="list">
         <ul id="catname">{categoriesName}</ul>
         <ul id="venlist">{venuesList}</ul>
         </div>        
       </main>
     )  
  }
  
}


export default listMain;
