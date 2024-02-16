import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "react-toastify/dist/ReactToastify.min.css"

import { Col, Container, Nav, Navbar, Row } from "react-bootstrap"
import { Link, NavLink, Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../store/user.slice"

export const CmsLayout = () => {
    const user = useSelector(state => state.user.value)

    const dispatch = useDispatch()

    const handleLogout = ev => {
        ev.preventDefault()

        localStorage.removeItem('token')

        dispatch(setUser({}))
    }

    return <>
        {Object.keys(user).length && <Navbar expand="lg" bg="dark" data-bs-theme="dark">
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
                    <Nav className="ms-auto">
                        <Nav.Item>
                            <NavLink to="#" className="nav-link">
                                <i className="bi-person-circle me-2"></i>{user.name}
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink to="#" className="nav-link" onClick={handleLogout}>
                                <i className="bi-box-arrow-right me-2"></i>Logout
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>}

        <Container>
            <Row>
                <Outlet />
            </Row>
        </Container>
    </>
}