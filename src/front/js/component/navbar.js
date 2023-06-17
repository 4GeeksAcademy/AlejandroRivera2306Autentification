import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
	const {store , actions} = useContext(Context)
	const navigate = useNavigate()

	function handleLogout (){

		actions.logout ()
		navigate('/')
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{/* <Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
						
					</Link> */}
				
					{store.auth == true ? 	<button className="btn btn-primary" onClick={ () => handleLogout()} >Log out</button> : null }
				</div>
			</div>
		</nav>
	);
};
