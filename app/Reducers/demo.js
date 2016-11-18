import { DEMO_CHANGED } from '../Constants/demo'

const initialState = {
	name: 'demo',
	changed: false
}

export const demo = (state=initialState, action)=>{
	switch(action.type) {
		case DEMO_CHANGED:
			return Object.assign({}, state, action.data)
			break
		default:
			return state
			break
	}
}