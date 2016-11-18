import React, { Component } from 'react'
import { Router, Route } from 'react-router'

import routers from '../../configs/config.routers'

class Routers extends Component {
	render() {
		return(
			<Router history={this.props.history}>
				{
					routers.map((item, index) => <Route path={item.link} component={item.component} key={'router-'+index} />)
				}
			</Router>
		)
	}
}

export default Routers