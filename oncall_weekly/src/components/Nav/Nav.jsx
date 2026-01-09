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
                    <Link to='/add'><i class="fas fa-user-plus"></i> <span>Registrar Usuarios</span></Link>
                </li>
                <li>
                    <Link to='/users'><i class="fas fa-user-plus"></i> <span>Usuarios</span></Link>
                </li>
                <li>
                    <Link to='/selection'><i class="fa-solid fa-plus"></i><span>Agregar OnCall</span></Link>
                </li>
                <li>
                    <Link to='/results'><i class="fa-notdog-duo fa-solid fa-chart-pie"></i> <span>Ver OnCall</span></Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}
