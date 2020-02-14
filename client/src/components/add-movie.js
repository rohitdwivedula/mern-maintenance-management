import React , {Component} from 'react'
import API from "../utils/API.js";
import './addmovie.css'

class MovieForm extends Component{
  state={
    loadStatus:false,
    anomaly: []
  }
  componentDidMount(){
    this.setState(this.props.location.state)
    API.get('/api/class/'+this.props.match.params.id).then((response) => {
      this.setState({error:false, anomaly:response.data, loadStatus:true})
      console.log(this.state.anomaly.class);
    }).catch(function (error) {
      console.log(error);
    });
  }
  render(){
    this.editClass  = this.editClass.bind(this)
    if(this.state.loadStatus==true){
    	var id = this.props.match.params.id;
	    var obj = this.state.anomaly.class;
	    var name = obj.name;
	    var severity = obj.severity_level;
	    var description = obj.description;
	    var post_trigger = obj.post_action;
	    var number = obj.number_discovered;
    }
    return(
      <div className="wrap">
      <h1 className="add-title">Edit Anomaly Label and Triggers</h1>
      <center><div style={{color: "white"}}> Class ID: {id}. This anomaly was observed {number} time(s).</div></center>
      <div className="content">
        <form onSubmit={this.editClass}>
          <div className="ad-n">
          <label title="Name of the class"><input type="text" name="name" defaultValue={name} ref="name"/></label>
          </div>
          <div className="ad-n">
          <label title="Severity level on a range of 1 - 10"><input type="text" name="severity_level" defaultValue={severity} ref="severity_level"/></label>
          </div>
          <div className="ad-n">
          <label title="What does this label mean?"><input type="text" name="desc" defaultValue={description} ref="desc"/></label>
          </div>
          <div className="ad-n">
          <center><label title="Actions to auto-trigger on detection"><textarea style={{width: "50%", height:"30%"}}name="post_action" defaultValue={post_trigger} ref="post_action"></textarea></label></center>
          </div>
          <br />
          <br />
          <br />
          <br />
          <input type="submit" value = "Submit"/>
        </form>
      </div>
      </div>
    )
  }

  editClass(e){
    e.preventDefault()
    var desc = this.refs.desc.value;
    var name = this.refs.name.value;
    var severity_level = Number(this.refs.severity_level.value);
    var post_action = this.refs.post_action.value;
    if(Number.isNaN(severity_level)||severity_level > 10||severity_level < 0){
      alert('Severity is defined on a scale of 1 to 10.');
    }
    else{
    	var url = '/api/class/' +  this.props.match.params.id + '/update';
		var body = {
			"description": desc,
			"name": name,
			"severity_level": severity_level,
			"post_action": post_action
		}
		console.log(body);
		API.post(url, body).then((res) => {
			alert("Updated successfully.");
			window.location = '/classes';
		})
	}
  }
}

export default MovieForm
