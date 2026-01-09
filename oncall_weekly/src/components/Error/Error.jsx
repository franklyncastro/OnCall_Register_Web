import './Error.module.css'
import {Link} from 'react-router-dom'

export default function Error() {
  return (

    <div class="tv-container">
      <div class="tv-screen">
        <div class="static"></div>
        <Link to='/'>
          
        <div class="error-text">
          ERROR
          <br />
          404
          <br />
          GO BACK
        </div>
        </Link>
      </div>
      <div class="tv-stand"></div>

    
    </div>

  )
}
