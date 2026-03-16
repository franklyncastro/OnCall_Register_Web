import './Error.module.css'
import {Link} from 'react-router-dom'

export default function Error() {
  return (

    <div callsName="tv-container">
      <div callsName="tv-screen">
        <div callsName="static"></div>
        <Link to='/'>
          
        <div callsName="error-text">
          ERROR
          <br />
          404
          <br />
          GO BACK
        </div>
        </Link>
      </div>
      <div callsName="tv-stand"></div>

    
    </div>

  )
}
