import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AuthProvider } from './context/AuthProvider'
import { AnimesContextProvider } from './context/AnimesContextProvider'

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			{/* Saves all home page animes to prevent a refetch every time user come back in the page */}
			<AnimesContextProvider>
				<App />
			</AnimesContextProvider>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
