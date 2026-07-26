import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo1 from '../assets/ninja-logo.webp';
import search from '../assets/search.png';
import menu from '../assets/menu.png';
import bag from '../assets/shopping-bag.png';
import person from '../assets/user.png';

import { useAppSelector } from '../lib/redux/hooks';

const MobileHeader = ({
  setIsSidebarOpen,
}: {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [mounted, setMounted] = useState(false);

  const cart = useAppSelector((state) => state.cartReducer);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="p-4 shadow-sm bg-white fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1">
          <img
            src={menu}
            alt="The menu button"
            className="w-8 cursor-pointer"
            onClick={() => setIsSidebarOpen(true)}
          />
          <img src={search} alt="The search button" className="w-8" />
        </span>

        <Link to="/">
          <img src={logo1} alt="Ninja logo" className="w-12" />
        </Link>

        <span className="flex items-center gap-1">
          <Link to="/profile">
            <img src={person} alt="Login/Signup" className="w-8" />
          </Link>

          <Link to="/cart">
            <span className="relative block">
              {/* 🔒 Render cart count ONLY after mount */}
              {mounted && cart.length > 0 && (
                <span className="w-5 h-5 bg-white border absolute top-[60%] left-[60%] rounded-full flex items-center justify-center text-xs font-semibold">
                  {cart.length}
                </span>
              )}
              <img src={bag} alt="Shopping cart" className="w-8" />
            </span>
          </Link>
        </span>
      </div>
    </header>
  );
};

export default MobileHeader;
