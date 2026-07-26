//IMPORTING HELPER COMPONENTS
import CombinedHeader from '../components/CombinedHeader';
import ProductCard from '../components/ProductCard';
import { ToastContainer } from 'react-toastify';

//IMPORTING TYPES AND INTERFACES
import type IProduct from '../interfaces/IProduct';

//IMPORTING HOOKS AND DEPS
import { useEffect } from 'react';
import useProducts from '../hooks/useProducts';

const KitchenAppliances = () => {
  const { isLoading, products, getProductCategory } = useProducts();

  useEffect(() => {
    getProductCategory('kitchen-appliances');
  }, []);

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
        <section className="flex justify-center mt-30">
          <span className="loading loading-ring loading-xl w-25 text-gray-500 block"></span>
        </section>
      ) : (
        <section>
          <div className="flex flex-wrap items-center gap-10 p-5 mt-15 md:mt-30 md:p-10 lg:p-15 xl:p-20 justify-center md:justify-between">
            {products?.map((item: IProduct, i: number) => {
              return (
                <ProductCard
                  key={i}
                  title={item.title}
                  price={item.price}
                  picture={item.picture}
                  productId={item._id}
                />
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};

export default KitchenAppliances;
