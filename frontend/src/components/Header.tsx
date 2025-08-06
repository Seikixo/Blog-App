import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Profile from './Profile';
import {
    Modal,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from 'flowbite-react';
import { useState } from 'react';

export default function Header() {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
    return(
        <>
        <Navbar fluid className="bg-blue-600 text-white">
            <Link
            to="/home"
            className="text-white text-xl font-semibold px-4 py-2 flex items-center"
            >
            Blog App
            </Link>
            <NavbarToggle />
            <NavbarCollapse>
                <NavbarLink 
                    href="/home" 
                    active={location.pathname === '/home'}
                    className="text-white"
                    onClick={(e) => {
                    e.preventDefault();
                    navigate('/home');
                    }}
                >
                    Home
                </NavbarLink>

                <NavbarLink 
                    href="/myposts" 
                    active={location.pathname === '/myposts'}
                    className="text-white"
                    onClick={(e) => {
                    e.preventDefault();
                    navigate('/myposts');
                    }}
                >
                    My Posts
                </NavbarLink>
                <NavbarLink
                    className="text-white cursor-pointer"
                    onClick={() => setShowProfileModal(true)}
                >
                    Profile
                </NavbarLink>
                <NavbarLink 
                    className="text-white cursor-pointer"
                    onClick={(e) => {
                    e.preventDefault();
                    logout();
                    }}
                >
                    Logout
                </NavbarLink>
            </NavbarCollapse>
        </Navbar>  
        <Modal
            show={showProfileModal}
            onClose={() => setShowProfileModal(false)}
            size="md"
            popup
        >
            <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Update Profile
            </h3>

            <Profile onClose={() => setShowProfileModal(false)} />
            </div>
        </Modal>      
        </>
    )
}