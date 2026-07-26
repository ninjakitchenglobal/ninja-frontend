//IMPORTING HELPOER COMPONENTS
import { Link } from 'react-router-dom';

//IMPORTING TYPES
import React from 'react';

//IMPORTING COMPONENT ASSETS
import close from '../assets/close (1).png';
import logo from '../assets/ninja-logo.webp';

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <aside
      className={`h-screen w-[90%] bg-white fixed top-0 left-0 ${
        isSidebarOpen ? 'top-0' : 'top-20'
      } transition-all duration-500 z-50`}
      style={{
        maxWidth: '300px',
        width: isSidebarOpen ? '300px' : '0',
        opacity: isSidebarOpen ? '1' : '0',
        pointerEvents: isSidebarOpen ? 'auto' : 'none',
        boxShadow: '0 0 10px gray',
      }}
    >
      <div className="p-5 border-b border-gray-300 flex items-center justify-between">
        <Link to={'/'}>
          {' '}
          <img src={logo} alt="Ninja logo" className="w-24" />
        </Link>

        <div
          className="h-10 w-8 cursor-pointer transition-all duration-300 hover:rotate-180"
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        >
          <img src={close} alt="" />
        </div>
      </div>

      <div>
        <ul>
          <Link to={'/all-products'}>
            {' '}
            <li className="p-3 border-b border-gray-300 font-bold text-gray-800">
              {' '}
              SHOP ALL{' '}
            </li>
          </Link>

          <Link to={'/kitchen-appliances'}>
            {' '}
            <li className="p-3 border-b border-gray-300 font-bold text-gray-800">
              {' '}
              KITCHEN APPLIANCES{' '}
            </li>
          </Link>
          <Link to={'/blenders-and-juicers'}>
            {' '}
            <li className="p-3 border-b border-gray-300 font-bold text-gray-800">
              {' '}
              BLENDERS & JUICERS{' '}
            </li>
          </Link>
          <Link to={'/kitchenware'}>
            {' '}
            <li className="p-3 border-b border-gray-300 font-bold text-gray-800">
              {' '}
              KITCHENWARE{' '}
            </li>
          </Link>
          <Link to={'/accessories-and-parts'}>
            {' '}
            <li className="p-3 border-b border-gray-300 font-bold text-gray-800">
              {' '}
              ACCESSORIES & PARTS{' '}
            </li>{' '}
          </Link>
          <Link to={'/bundle-and-save'}>
            {' '}
            <li className="p-3 border-b border-gray-300 font-bold text-gray-800">
              {' '}
              BUNDLE & SAVE{' '}
            </li>{' '}
          </Link>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
