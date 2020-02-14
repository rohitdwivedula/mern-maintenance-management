import React , {Component} from 'react'
import Navbar from './navbar.js'
import {Link, Redirect} from 'react-router-dom';
import './view-movie.css'
import API from "../utils/API.js";

class EachClass extends Component{
  render(){
    var name = this.props.name;
    var severity = [this.props.severity];  
    var number_discovered = [this.props.number_discovered]
    this.linkHandler = this.linkHandler.bind(this);
    var linkButton = (<button className="m-del btn btn-primary" id={"emub"} onClick={this.linkHandler}>Edit</button>)
    var post_action = this.props.post_action.replace("\n", "<br>"); 
    //
    severity = severity.map(function(key,index){
      return(<div className="mkey"><p>Severity: {key}</p></div>)
    });
    number_discovered = number_discovered.map(function(num,index){
      return(<div className="mtech"><p>{num}</p></div>)
    });
    return(
        <div className='each-micro each-mf-comp'>
            <div className="em1">
              <h3 className='movie-name'>{name}</h3>
              <div className="movie_cast">
                {severity}
              </div>
              <p> {this.props.desc} </p>
              <p> On trigger, run the following script: </p>
              <p className="micro-desc"><div dangerouslySetInnerHTML={{ __html: post_action }}></div>
              </p>
              <h3 className="ts-title"># of Incidents So Far</h3>
              <div className="tech_stack">
                  {number_discovered}
              </div>
              <div className="micro-but">
                {linkButton}
              </div>
            </div>
        </div>
    )
  }

  /*
  Sometimes, micro-frontends listen to some events and perform actions as well, the function(s) presen below are normal event-handlers from react.
  */
  linkHandler(e)
  {
    var url = "/class/" + this.props.anomoly_id + "/edit";
    window.location = url;
  }
}

/*
Component here is exported so that it can be embedded in other, larger Components
*/

export default EachClass
