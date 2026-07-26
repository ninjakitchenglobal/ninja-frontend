// UI COMPONENTS
import CombinedHeader from './CombinedHeader';
import { ToastContainer } from 'react-toastify';

// ASSETS
import bin from '../assets/bin.png';

// STATE
import { useAppSelector } from '../lib/redux/hooks';

// DEPS
import { useEffect } from 'react';
import useCart from '../hooks/useCart';

export default function CartClient() {
  const {
    isLoading,
    getCartProducts,
    cartDetails,
    removeItem,
    proceedToCheckout,
  } = useCart();

  const cart = useAppSelector((state) => state.cartReducer);

  /* ------------------- WINDOW SIZE ------------------- */

  /* ------------------- FETCH CART PRODUCTS ------------------- */
  useEffect(() => {
    if (!cart.length) {
      return;
    }

    getCartProducts();
  }, [cart]);

  /* ------------------- HANDLERS ------------------- */

  /* ------------------- EMPTY CART ------------------- */
  if (!cart.length) {
    return (
      <>
        <CombinedHeader />

        <section className="mt-50 text-center text-2xl font-semibold text-gray-700 p-3">
          <h2>You do not have any items in your cart</h2>
        </section>
      </>
    );
  }

  /* ------------------- MAIN UI ------------------- */
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <CombinedHeader />
      {isLoading ? (
        <section className="flex justify-center mt-70">
          <span className="loading loading-ring loading-xl w-25 block" />
        </section>
      ) : (
        <section className="mt-25 px-5 md:mt-40 md:px-10 lg:px-15 xl:px-20">
          <div className="flex flex-col gap-5">
            {cartDetails.map((item) => (
              <div
                key={item._id}
                className="flex items-center border border-gray-300 rounded-lg p-3 justify-between"
              >
                <div className="flex items-center gap-3 w-[80%]">
                  <span className="block w-24 h-24 relative border rounded-lg">
                    <img
                      src={item.picture || '/placeholder.png'}
                      alt={item.title}
                    />
                  </span>

                  <span className="text-sm font-semibold w-[80%]">
                    <h2 className="text-gray-700">{item.title}</h2>
                    <p className="text-gray-500">${item.price}</p>
                  </span>
                </div>

                <button
                  onClick={() => removeItem(item._id)}
                  className="w-10 h-10 border p-2 rounded-lg hover:bg-gray-200"
                >
                  <img src={bin} alt="Remove" />
                </button>
              </div>
            ))}

            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  proceedToCheckout();
                }}
                className="bg-black py-2 px-5 rounded-lg text-white font-semibold cursor-pointer"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
