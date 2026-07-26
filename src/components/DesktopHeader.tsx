//IMPORTING COMOPONENT ASSETS
import logo from '../assets/ninja-logo.webp';
import search from '../assets/search.png';
import person from '../assets/user.png';
import bag from '../assets/shopping-bag.png';

//IMPORTING HELPER COMPONENTS
import { Link } from 'react-router-dom';

//STATE MANAGEMENT
import { useAppSelector } from '../lib/redux/hooks';
import { useState } from 'react';

import { DEV_API } from '../lib/utils/api-url';
import axios from 'axios';
import { toast } from 'react-toastify';
import type IProduct from '../interfaces/IProduct';

const DesktopHeader = () => {
  const cart = useAppSelector((state) => state.cartReducer);
  const [searchParams, setSearchParams] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState<IProduct[]>();

  const handleSearchChange = (e: any) => {
    setSearchParams(e.target.value);

    if (isLoading) {
      return;
    }

    if (searchParams) {
      setTimeout(searchProducts, 2000);
    } else {
      return;
    }
  };

  const searchProducts = async () => {
    try {
      setIsModalOpen(true);
      setIsLoading(true);
      const res = await axios.get(
        `${DEV_API}/product/product-search/${searchParams}`,
      );
      setSearchData(res.data.data);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.response.message);
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <header
      onClick={() => {
        setIsModalOpen(false);
      }}
      className="p-5 bg-white fixed top-0 left-0 w-full z-50"
    >
      <section className="flex items-center justify-between relative">
        {/* SEARCH MODAL */}
        {isModalOpen ? (
          <div className="absolute top-10 left-[22%] h-70 w-150 bg-white overflow-y-scroll">
            {isLoading ? (
              <div className="flex items-center justify-center relative top-15">
                <span className="loading loading-ring loading-xl w-25 text-gray-500 block"></span>
              </div>
            ) : (
              searchData?.map((item: IProduct, i: number) => {
                return (
                  <Link to={''} key={i} className="hover:bg-gray-200">
                    <div className="flex items-center gap-2 mb-3 px-5 py-3 hover:bg-gray-200">
                      <span>
                        <img src={item.picture} alt="" className="w-20" />
                      </span>
                      <span>
                        <p className="text-gray-700 text-sm font-semibold">
                          {item.title.slice(0, 80)}...
                        </p>
                        <p className="text-gray-700 text-sm font-semibold">
                          {' '}
                          ${item.price}{' '}
                        </p>
                      </span>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        ) : (
          ''
        )}
        {/* SEARCH MODAL END */}

        <div>
          <Link to={'/'}>
            {' '}
            <img src={logo} alt="Ninja Logo" className="w-25" />{' '}
          </Link>
        </div>

        <div className="relative flex items-center w-[60%]">
          <input
            type="text"
            placeholder="I'm shopping for ..."
            className="bg-gray-200 rounded-2xl py-2 px-4 w-full"
            value={searchParams}
            onChange={handleSearchChange}
          />

          <img
            src={search}
            alt="The search button"
            className="w-8 absolute top-o left-[91%] lg:left-[95%]"
          />
        </div>

        <div className="flex items-center gap-4">
          <Link to={'/cart'}>
            {' '}
            <span className=" block relative">
              {cart.length > 0 ? (
                <span className=" w-5 h-5 bg-white border absolute top-[60%] left-[60%] rounded-full flex items-center justify-center text-xs font-semibold">
                  {cart.length}
                </span>
              ) : (
                ''
              )}
              <img src={bag} alt="Shopping cart" className="w-8" />
            </span>{' '}
          </Link>
          <Link to={'/profile'}>
            {' '}
            <span>
              <img src={person} alt="Shopping cart" className="w-8" />
            </span>
          </Link>
        </div>
      </section>

      <section className="w-[90%] mx-auto mt-8">
        <ul className="flex text-sm gap-3 font-semibold justify-center">
          <Link to={'/all-products'}>
            {' '}
            <li> Shop All </li>
          </Link>
          <Link to={'/kitchen-appliances'}>
            {' '}
            <li> Kitchen Appliances </li>
          </Link>
          <Link to={'/blenders-and-juicers'}>
            {' '}
            <li> Blenders & Juicers </li>
          </Link>
          <Link to={'/kitchenware'}>
            {' '}
            <li> Kitchenware </li>
          </Link>
          <Link to={'/accessories-and-parts'}>
            {' '}
            <li> Accessories & Parts </li>
          </Link>
          <Link to={'/bundle-and-save'}>
            <li> Bundle & Save </li>
          </Link>
        </ul>
      </section>
    </header>
  );
};

export default DesktopHeader;
