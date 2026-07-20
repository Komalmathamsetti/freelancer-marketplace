import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "react-hot-toast";
import './index.css'
import App from './App.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationProvider>
    <Toaster 
       position="top-center"
       reverseOrder={false}
       toastOptions={{
        duration:3000,
        style:{
          background: "#fff",
          color: "#1f2937",
          borderRadius: "12px",
          fontSize :"15px",
          padding:"14px"
        },
        success:{
          iconTheme:{
            primary: "#16a34a",
            secondary: "#fff",
          },
        },
        error:{
          iconTheme:{
            primary: "#dc2626",
            secondary: "#fff",
          },
        },
       }}
    />
    <App />
    </NotificationProvider>
  </StrictMode>,
)
