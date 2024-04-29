



const NavBar = () => {
  return (
   <div  className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            Bruno Ruiz
        </span>

        <button className="btn btn-danger">
            <i className="fas fa-sign-out-alt"></i>
            <span>Salir</span>
        </button>
   </div>
  )
}

export default NavBar