import Home from './pages/Home.jsx'
import Resume from './pages/Resume.jsx'

function currentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

export default function App() {
  if (currentPath() === '/resume') {
    return <Resume />
  }

  return <Home />
}
