import { DEMO_CHANGED } from '../Constants/demo'

export const setDemoInfo = (data)=>{
	return {
		type: DEMO_CHANGED,
		data
	}
}
