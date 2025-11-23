import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/UseTheme';
import Button from '../ui/Button';


const Navbar: React.FC = () => {
const { user, logout } = useAuth();
const { theme, toggle } = useTheme();
const [open, setOpen] = useState(false);
const nav = useNavigate();


return (
<nav className="bg-white dark:bg-gray-800 shadow">
<div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
<Link to="/" className="text-2xl font-bold text-blue-600">BlogApp</Link>
<div className="hidden md:flex items-center space-x-4">
<NavLink to="/" className={({isActive})=>isActive? 'text-blue-600':'text-gray-700'}>Home</NavLink>
{user && <NavLink to="/create">Create</NavLink>}
{user && <NavLink to={`/profile`}>Profile</NavLink>}
{user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
<Button onClick={toggle}>{theme === 'dark' ? '☀️' : '🌙'}</Button>
{user ? (
<Button onClick={() => { logout(); nav('/'); }}>Logout</Button>
) : (
<div className="space-x-2">
<Link to="/login" className="text-gray-700">Login</Link>
<Link to="/register" className="bg-blue-600 text-white px-3 py-1 rounded">Register</Link>
</div>
)}
</div>


{/* Mobile */}
<div className="md:hidden flex items-center">
<button onClick={() => setOpen(o => !o)} className="mr-2">☰</button>
</div>
</div>


{open && (
<div className="md:hidden bg-white dark:bg-gray-800 px-4 pb-4">
<Link to="/" className="block py-2">Home</Link>
{user && <Link to="/create" className="block py-2">Create</Link>}
{user && <Link to="/profile" className="block py-2">Profile</Link>}
{user?.role === 'admin' && <Link to="/admin" className="block py-2">Admin</Link>}
<button onClick={toggle} className="block py-2">Toggle Theme</button>
</div>
)}
</nav>
);
};


export default Navbar;