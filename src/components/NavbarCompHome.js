import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from 'react-bootstrap';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import categories from '../categories.json';
const NavbarCompHome = ({ setSearchTerm, offers }) => {
	const nameToURL = (catName) => {
		catName = catName.replace(' ', '-');
		return catName.toLowerCase();
	};

	const isLogged = localStorage.getItem("login_data") ? true : false;

	const doLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem("login_data");
		window.location.reload();
	}

	return (
		<Navbar bg="light" expand="lg">
			<Container fluid>
				<Navbar.Brand href="#">Fiverr</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="me-auto my-2 my-lg-0" navbarScroll>
						<Nav.Link as={Link} to={'/categorias/todas'}>
							Home
						</Nav.Link>
						<NavDropdown title="Categorias" id="navbarScrollingDropdown">
							<NavDropdown.Item key={0} as={Link} to={'/categorias/todas'}>
								Todas
							</NavDropdown.Item>
							{categories.map((category) => {
								return (
									<NavDropdown.Item
										key={category.id}
										as={Link}
										to={'/categorias/' + nameToURL(category.name)}
									>
										{category.name}
									</NavDropdown.Item>
								);
							})}
						</NavDropdown>
					</Nav>
					{offers.length > 0 && (
						<Form className="d-flex">
							<FormControl
								type="search"
								placeholder="Search"
								className="me-2"
								aria-label="Search"
								onChange={(e) => {
									setSearchTerm(e.target.value);
								}}
							/>
							<Link to={'/categorias/todas'}>
								<Button type="submit" variant="outline-primary">
									Search
								</Button>
							</Link>
						</Form>
					)}
					{isLogged && (<Button type="button" variant="danger" className="ms-2" onClick={doLogout}>Cerrar sesión</Button>)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarCompHome;
