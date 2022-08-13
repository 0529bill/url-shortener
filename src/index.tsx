import 'antd/dist/antd.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import App from './App'
import { ContextApiProvider } from '@/contextProvider'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
	<React.StrictMode>
		<ContextApiProvider>
			<App />
		</ContextApiProvider>
	</React.StrictMode>
)
