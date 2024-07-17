import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FaBell, FaEnvelope, FaUser, FaSignInAlt, FaSearch } from 'react-icons/fa';
import '../../styles/sb-admin-2.css';

const Topbar = () => {
    return (
        <Navbar bg="white" expand="lg" className="topbar mb-4 static-top shadow">
            <Form className="form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                    <FormControl
                        type="text"
                        className="bg-light border-0 small"
                        placeholder="Search for..."
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                        <Button variant="primary" type="button">
                            <FaSearch />
                        </Button>
                    </div>
                </div>
            </Form>
            <Nav className="ml-auto">
                <Nav.Item className="nav-item dropdown no-arrow mx-1">
                    <Nav.Link className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <FaBell />
                        <span className="badge badge-danger badge-counter">3+</span>
                    </Nav.Link>
                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                         aria-labelledby="alertsDropdown">
                        <h6 className="dropdown-header">
                            Alerts Center
                        </h6>
                        {/* Alert Items */}
                    </div>
                </Nav.Item>
                <Nav.Item className="nav-item dropdown no-arrow mx-1">
                    <Nav.Link className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <FaEnvelope />
                        <span className="badge badge-danger badge-counter">7</span>
                    </Nav.Link>
                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                         aria-labelledby="messagesDropdown">
                        <h6 className="dropdown-header">
                            Message Center
                        </h6>
                        {/* Message Items */}
                    </div>
                </Nav.Item>
                <div className="topbar-divider d-none d-sm-block"></div>
                <Nav.Item className="nav-item dropdown no-arrow">
                    <Nav.Link className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                        <img className="img-profile rounded-circle" src="img/undraw_profile.svg" alt="Profile" />
                    </Nav.Link>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                         aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#">
                            <FaUser className="fa-sm fa-fw mr-2 text-gray-400" />
                            Profile
                        </a>
                        <a className="dropdown-item" href="#">
                            <FaSignInAlt className="fa-sm fa-fw mr-2 text-gray-400" />
                            Logout
                        </a>
                    </div>
                </Nav.Item>
            </Nav>
        </Navbar>
    );
};

export default Topbar;
