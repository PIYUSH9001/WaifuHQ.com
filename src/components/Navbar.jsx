import React, { useContext } from 'react'
import Loli from '../images/LoliIcon.png';
import '../styles/navbar.css';
import { Link } from 'react-router-dom';
import { AnimeContext } from '../context';
export default function Navbar() {
  const {SearchInput,setSearchInput} = useContext(AnimeContext);
  const handleInputChange = (event)=>{
      setSearchInput(event.target.value)
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      <img className="mx-2" src={Loli} alt="loli" width="45" height="45" style={
        {
          borderRadius:'50%',
        }
      }/>
      WaifuHQ.com
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item tex">
          <Link className="nav-link active text-light" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item tex">
          <Link className="nav-link text-light" to="/anime/popular">Popular</Link>
        </li>
        <li className="nav-item tex dropdown">
          <Link className="nav-link dropdown-toggle text-light" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </Link>
          <ul className="dropdown-menu bg-dark border border-light border-2 rounded p-2">
            <li><Link className="dropdown-item text-center text-danger rounded" to="/shounen"><b>Shounen</b></Link></li>
            <li><Link className="dropdown-item text-center text-danger rounded" to="/romance"><b>Romance</b></Link></li>
            <li><Link className="dropdown-item text-center text-danger rounded" to="/shoujo"><b>Shoujo</b></Link></li>
            <li><Link className="dropdown-item text-center text-danger rounded" to="/sol"><b>Slice of life</b></Link></li>
            <li><Link className="dropdown-item text-center text-danger rounded" to="/isekai"><b>Isekai</b></Link></li>
            <li><Link className="dropdown-item text-center text-danger rounded" to="/comedy"><b>Comedy</b></Link></li>
            <li><Link className="dropdown-item text-center text-danger rounded" to="/psychology"><b>Psychological</b></Link></li>
            <li><Link className="dropdown-item text-center text-danger rounded" to="/music"><b>Music</b></Link></li>
            {/* <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" to="/">Something else here</a></li> */}
          </ul>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleInputChange} value={SearchInput}/>
        <Link to={`/search/${SearchInput}`}>
        <button className="btn btn-outline-light border-2" type="submit" onClick={()=>{
          setSearchInput('');
        }}>Search</button>
        </Link>
      </form>
    </div>
  </div>
</nav>
  )
}
