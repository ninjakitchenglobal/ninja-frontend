//IMPORTING HELPER COMPONENTS
import CombinedHeader from '../components/CombinedHeader';

//IMPORTING NECCESSARY HOOKS
import useOrder from '../hooks/useOrder';
import useProfile from '../hooks/useProfile';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAppContext } from '../context/AppContext';

const OrderProgress = () => {
  const { user } = useAppContext();
  const { getPurchase, isLoading, purchase, progressOrder } = useOrder();
  const { getUser, userDetails } = useProfile();
  const { purchaseId } = useParams();

  useEffect(() => {
    if (!user) {
      return;
    }

    if (!purchaseId) {
      toast.error('Error loading page: order ID irregular');
      return;
    }

    getUser();

    getPurchase(purchaseId);
  }, [user]);

  if (isLoading) {
    return (
      <>
        <CombinedHeader />
        <section className="flex justify-center mt-70">
          <span className="loading loading-ring loading-xl w-25 block" />
        </section>
      </>
    );
  }

  if (!purchase) {
    return (
      <section className="flex justify-center mt-70">
        <span className="loading loading-ring loading-xl w-25 block" />
      </section>
    );
  }

  const {
    orderNumber,
    orderProgress,
    destinationCountry,
    address,
    status,
    createdAt,
    products,
  } = purchase;

  const orderProgressNumber: Record<number, string> = {
    0: 'Processing (the warehouse is preparing your order)',
    20: 'Packing (items are being packed for shipment)',
    40: 'Shipped (package has left the warehouse)',
    60: 'In transit(courier is transporting your package)',
    80: 'Arrived at local facility',
    100: 'Delivered',
  };

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
      <section className="mt-20 md:mt-40">
        <div
          className="w-[90%] border-2 border-gray-400  rounded-lg
          mx-auto p-3"
        >
          <span className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <span
                className={`block h-3 w-3 border border-gray-500 rounded-full ${status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'}`}
              ></span>{' '}
              <h1 className="text-xl text-gray-700 font-bold my-3">
                {' '}
                #{orderNumber}{' '}
              </h1>
            </span>

            <p className="text-xs text-gray-600 font-semibold">
              {createdAt.slice(0, 10)}
            </p>
          </span>

          <h2 className="text-lg text-gray-700 font-semibold">
            {' '}
            Order Details{' '}
          </h2>

          <div className="flex flex-col gap-3 text-gray-700">
            <p> Transaction Status: {status} </p>

            <p>Destination Country: {destinationCountry}</p>
            <p>Shipping Address: {address}</p>

            <span>
              <p className="mb-2">Order progress: </p>
              <span className="block w-full h-3 rounded-lg shadow-sm ">
                <span
                  className="block rounded-lg h-full bg-gray-700"
                  style={{ width: `${orderProgress + '%'}` }}
                ></span>
              </span>
              <p className="text-xs mt-1 text-gray-600">
                {orderProgressNumber[orderProgress]}
              </p>
            </span>
          </div>
        </div>

        <div className="w-[90%] mx-auto mt-10 text-gray-400">
          {products.map((item) => (
            <div
              key={item._id}
              className="flex items-center border-2 border-gray-400 rounded-lg p-3 justify-between"
            >
              <div className="flex items-center gap-3 w-[80%]">
                <span className="block w-24 h-24 relative border rounded-lg">
                  <img
                    src={item.picture || '/placeholder.png'}
                    alt={item.title}
                  />
                </span>

                <span className="text-sm w-[80%]">
                  <h2 className="text-gray-700">{item.title}</h2>
                  <p className="text-gray-500">${item.price}</p>
                </span>
              </div>
            </div>
          ))}
        </div>

        {userDetails?.isAdmin ? (
          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={() => {
                if (!purchaseId) {
                  toast.error('Error loading page: order ID irregular');
                  return;
                }
                progressOrder(purchaseId);
              }}
              className="bg-black py-2 px-5 rounded-lg text-white font-semibold cursor-pointer"
            >
              Progress Order
            </button>
          </div>
        ) : (
          ''
        )}
      </section>
    </>
  );
};

export default OrderProgress;
