import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from './redux/'
import { Provider } from 'react-redux'
import { reduxUser } from './redux/user/userActions'

const store = createStore(reducers, applyMiddleware(thunkMiddleware))
store.dispatch(reduxUser)

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
