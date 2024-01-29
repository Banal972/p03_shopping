import ReactDOM from 'react-dom/client';
import "./asset/css/reset.css";
import "./asset/scss/commond.scss";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// 쿠키
import {CookiesProvider} from "react-cookie"
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  // <Provider store={store}>
  // </Provider> 

  // <React.StrictMode>
    
  // </React.StrictMode>

  <CookiesProvider>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </CookiesProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();