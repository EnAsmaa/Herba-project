import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'
import './index.css'
import 'aos/dist/aos.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <HeroUIProvider>
    <App />
  </HeroUIProvider>
)