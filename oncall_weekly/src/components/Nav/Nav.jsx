import '../../style/Nav.css'
import {Link} from 'react-router-dom'

export default function Nav() {
  return (
    <div>
        <nav>
            <ul>
                <li>
                    <Link to='/'><i class="fa-solid fa-house"></i> Inicio</Link>
                </li>
                <li>
                    <Link to='/selection'><i class="fa-slab fa-regular fa-plus"></i> Agregar</Link>
                </li>
                <li>
                    <Link to='/results'><i class="fa-notdog-duo fa-solid fa-chart-pie"></i> Registro</Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}
