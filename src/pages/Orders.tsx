//IMPORTING HELPER COMPONENTS
import CombinedHeader from '../components/CombinedHeader';
import { ToastContainer } from 'react-toastify';

//IMPORTING HOOKS
import { useAppContext } from '../context/AppContext';
import useProfile from '../hooks/useProfile';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Orders = () => {
  const { user } = useAppContext();
  const { isLoading, getUserPurchases, userOrders } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return;
    }
    getUserPurchases();
  }, [user]);

  if (isLoading) {
    return (
      <section className="flex justify-center mt-70">
        <span className="loading loading-ring loading-xl w-25 block" />
      </section>
    );
  }

  if (userOrders.length < 1) {
    return (
      <>
        <CombinedHeader />

        <h2 className="mt-40 text-center text-xl text-gray-700 font-semibold">
          {' '}
          You have not made any purchases yet{' '}
        </h2>

        <button
          onClick={() => {
            navigate('/all-products');
          }}
          className="py-2 px-4 bg-black text-white rounded-lg text-lg font-semibold w-[60%] mx-auto mt-10 hover:scale-105 transition-all cursor-pointer block"
        >
          Shop
        </button>
      </>
    );
  }

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

      <section className="mt-20 flex flex-col gap-3 px-5 md:mt-40">
        {userOrders.map((item, i: number) => (
          <Link to={`/order-progress/${item._id}`} key={i}>
            <div className="flex items-center border border-gray-300 rounded-lg p-3 justify-between">
              <div className="flex items-center gap-3 w-[90%]">
                <span className="text-sm font-semibold w-[80%]">
                  <h2 className="text-gray-700 text-lg">{item.orderNumber}</h2>

                  <ul className="text-gray-700 list-disc relative left-10">
                    {item.products.map((product, i: number) => {
                      return <li key={i}>{product.title.slice(0, 50)}...</li>;
                    })}
                  </ul>
                  <p className="text-xs text-gray-400 mt-3">
                    {' '}
                    {item.createdAt.slice(0, 10)}{' '}
                  </p>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
};

export default Orders;
