import '../../style/Nav.css'
import {Link} from 'react-router-dom'

export default function Nav() {
  return (
    <div>
        <nav>
            <ul>
                <li>
                    <Link to='/'><i className="fa-solid fa-house"></i> <span>Inicio</span></Link>
                </li>
                <li>
                    <Link to='/add'><i className="fas fa-user-plus"></i> <span>Registrar Usuarios</span></Link>
                </li>
                <li>
                    <Link to='/users'><i className="fas fa-user-plus"></i> <span>Usuarios</span></Link>
                </li>
                <li>
                    <Link to='/selection'><i className="fa-solid fa-plus"></i><span>Agregar OnCall</span></Link>
                </li>
                <li>
                    <Link to='/results'><i className="fa-notdog-duo fa-solid fa-chart-pie"></i> <span>Ver OnCall</span></Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}
