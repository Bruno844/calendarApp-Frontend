import { useAuthStore } from "../../hooks/useAuthStore"




const NavBar = () => {

  const {startLogOut,user} = useAuthStore();


  return (
   <div  className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            {user.name}
        </span>

        <button onClick={startLogOut} className="btn btn-danger">
            <i className="fas fa-sign-out-alt"></i>
            <span>Salir</span>
        </button>
   </div>
  )
}

export default NavBar