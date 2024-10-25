import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import store from './redux/store/store'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
  <BrowserRouter>
  <Toaster/>
    <App />
  </BrowserRouter>
  </Provider>
)
