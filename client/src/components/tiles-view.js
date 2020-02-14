import React , {Component} from 'react'
import {Link} from 'react-router-dom';
import EachClass from './each-class.js'
import API from "../utils/API.js";

class TilesView extends Component{
  state={
    loadStatus:false,
    anomalies: []
  }
  componentDidMount(){
  	this.getData();
  	setInterval(this.getData, 5000);
  }
  getData = () => {
  	this.setState(this.props.location.state);
    API.get('/api/classes').then((response) => {
      this.setState({error:false, anomalies:response.data, loadStatus:true})
      console.log(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  }
  render(){
    // this.microUpdate = this.microUpdate.bind(this)
    // this.filter = this.filter.bind(this)
    var anomalies = this.state.anomalies;
    console.log(anomalies);
    if(this.state.loadStatus==true){
      anomalies = anomalies.map(function(anomoly){
        return(
          <EachClass anomoly_id={anomoly._id} name={anomoly.name} desc={anomoly.description} severity={anomoly.severity_level} post_action={anomoly.post_action} number_discovered={anomoly.number_discovered}/>
        )
      }.bind(this));
    }
    return(
      <div className="wrap">
          <h1 className="title">Anomaly Classes</h1>
          <div className="content">
            {anomalies}
          </div>
      </div>
    )
  }
}

export default TilesView
