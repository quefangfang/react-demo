import React, { Component }  from 'react';

class NotFound extends Component {
    state = {
        animated: ''
    };
    enter = () => {
        this.setState({animated: 'hinge'})
    };
    render() {
        return (
            <div className="text-c" style={{height: '100%', background: '#ececec', overflow: 'hidden',paddingTop:'100px'}}>
                <img src={require('../assets/images/404.png')} alt="404" className={`animated swing ${this.state.animated}`} onMouseEnter={this.enter} />
            </div>
        )
    }
}

export default NotFound;