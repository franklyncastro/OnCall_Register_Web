import '../../style/Nav.css'
import {Link} from 'react-router-dom'

export default function Nav() {
  return (
    <div>
        <nav>
            <ul>
                <li>
                    <Link to='/'><i class="fa-solid fa-house"></i> <span>Inicio</span></Link>
                </li>
                <li>
                    <Link to='/selection'><i class="fa-solid fa-plus"></i><span>Agregar</span></Link>
                </li>
                <li>
                    <Link to='/results'><i class="fa-notdog-duo fa-solid fa-chart-pie"></i> <span>Registro</span></Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}
