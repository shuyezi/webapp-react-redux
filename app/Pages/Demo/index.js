import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { setDemoInfo } from '../../Actions/demo'

import './index.less'

class Demo extends Component {
	render() {
		const { changed, setDemoInfo } = this.props
		const newState = {
			changed: !changed
		}
		return(
			<div>
				<p>I am demo and my tips is {changed?'changed':'new'}</p>
				<button onClick={()=>setDemoInfo(newState)}>点我点我[DEMO]</button><br /><br />
				<Link to='/'>GO_TO_SEE_INDEX</Link>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		changed: state.demo.changed
	}
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		setDemoInfo: (...args)=>dispatch(setDemoInfo(...args))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo)