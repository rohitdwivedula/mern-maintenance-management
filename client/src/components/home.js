import React , {Component} from 'react'
import './home.css'

class Home extends Component {
  render(){
    return(
      <div className="home-wrap">
        <div className="landing">
          <h1 className="home-title">Maintenance System</h1>
            <div className="land-desc col-lg-6 col-md-7">
              A machine learning solution to identify, track and manage issues occuring with your hardware. <a href="/classes">Begin your journey.</a>
            </div>
        </div>
      </div>
    );
  }
}

export default Home
