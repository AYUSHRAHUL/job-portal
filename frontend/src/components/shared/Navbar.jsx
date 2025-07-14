import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, Menu, User2, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Logout failed');
    }
  };

  const navLinks =
    user?.role === 'recruiter'
      ? [
          { name: 'Companies', path: '/admin/companies' },
          { name: 'Jobs', path: '/admin/jobs' }
        ]
      : [
          { name: 'Home', path: '/' },
          { name: 'Jobs', path: '/jobs' },
          { name: 'Browse', path: '/browse' },
          { name: 'About', path: '/creater' }
        ];

  return (
    <header className='bg-gray-900 text-white shadow-md sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>

          {/* Logo */}
          <Link to="/" className='flex-shrink-0'>
            <h1 className='text-2xl font-extrabold'>
              Job<span className='text-[#8F5FFF]'>Khojo</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-10'>
            <ul className='flex gap-6 items-center font-medium'>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className='hover:text-[#8F5FFF] transition-colors'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            {!user ? (
              <div className='flex gap-3'>
                <Link to="/login">
                  <Button className="bg-[#8F5FFF] hover:bg-[#7a49f0] text-white">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#8F5FFF] hover:bg-[#7a49f0] text-white">Signup</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer hover:ring-2 hover:ring-[#8F5FFF] transition">
                    <AvatarImage
                      src={user?.profile?.profilePhoto || '/default-avatar.png'}
                      alt="User avatar"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-gray-800 border-none text-white">
                  <div className='flex gap-3 items-center mb-4'>
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto || '/default-avatar.png'} />
                    </Avatar>
                    <div>
                      <h4 className='font-semibold text-lg'>{user?.fullname}</h4>
                      <p className='text-sm text-gray-400'>{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className='flex flex-col space-y-2'>
                    {user.role === 'student' && (
                      <Link
                        to="/profile"
                        className='flex items-center gap-2 text-sm hover:text-[#8F5FFF] transition'
                      >
                        <User2 className="w-5 h-5" /> View Profile
                      </Link>
                    )}
                    <button
                      onClick={logoutHandler}
                      className='flex items-center gap-2 text-sm text-red-400 hover:underline'
                    >
                      <LogOut className="w-5 h-5" /> Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-gray-800 space-y-5 text-white">
          <ul className="flex flex-col gap-3 font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className='hover:text-[#8F5FFF] transition-colors block py-1'
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          {!user ? (
            <div className='flex flex-col gap-3'>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button className='w-full bg-[#8F5FFF] hover:bg-[#7a49f0] text-white'>Login</Button>
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <Button className='w-full bg-[#8F5FFF] hover:bg-[#7a49f0] text-white'>Signup</Button>
              </Link>
            </div>
          ) : (
            <div className='flex flex-col gap-3'>
              {user.role === 'student' && (
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className='flex items-center gap-2 text-sm hover:text-[#8F5FFF]'
                >
                  <User2 className="w-5 h-5" /> View Profile
                </Link>
              )}
              <button
                onClick={() => {
                  logoutHandler();
                  setMenuOpen(false);
                }}
                className='flex items-center gap-2 text-sm text-red-400 hover:underline'
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
