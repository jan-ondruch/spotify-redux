import React from 'react'
import FilterLink from '../containers/FilterLink'

import '../styles/navbar.css'

const Navbar = ({ onClick, subPage, page }) => (
	<div className='navbar-wrapper'>
		<li style={{textDecoration: page === 'top-results' ? 'underline' : 'none'}}>
			<FilterLink	page="top-results" onClick={onClick} subPage={subPage}>
				Top Results
			</FilterLink>
		</li>
		<li style={{textDecoration: page === 'artists' ? 'underline' : 'none'}}>
			<FilterLink	page="artists" onClick={onClick} subPage={subPage}>
				Artists
			</FilterLink>
		</li>
		<li style={{textDecoration: page === 'tracks' ? 'underline' : 'none'}}>
			<FilterLink page="tracks" onClick={onClick} subPage={subPage}>
			  Tracks
			</FilterLink>
		</li>
		<li style={{textDecoration: page === 'albums' ? 'underline' : 'none'}}>
			<FilterLink page="albums" onClick={onClick} subPage={subPage}>
			  Albums
			</FilterLink>
		</li>
	</div>
)

export default Navbar