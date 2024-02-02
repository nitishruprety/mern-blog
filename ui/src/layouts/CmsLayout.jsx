import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "react-toastify/dist/ReactToastify.min.css"

import { Col, Container, Nav, Navbar, Row } from "react-bootstrap"
import { Link, NavLink, Outlet } from "react-router-dom"

export const CmsLayout = () => {
    return <>
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
            <Container>
                <Link to="/cms/dashboard" className="navbar-brand">
                    Blog
                </Link>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Item>
                            <NavLink to="/cms/users" className="nav-link">
                                <i className="bi-people me-2"></i>Users
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Container>
            <Row>
                <Outlet />
            </Row>
        </Container>
    </>
}