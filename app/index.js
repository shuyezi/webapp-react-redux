/**
 * 入口文件
 */

import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

//路由们
import Routers from './Routers'
//合并后的reducer
import Reducers from './Reducers'

//注册store
const store = createStore(Reducers, applyMiddleware(thunk))
const history = syncHistoryWithStore(browserHistory, store)

ReactDom.render(
	<Provider store={store}>
		<Routers history={history} />
	</Provider>,
	document.getElementById("wrapper")
)

