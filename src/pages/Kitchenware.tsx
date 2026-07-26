//IMPORTING HELPER COMPONENTS
import ProductCard from '../components/ProductCard';
import type IProduct from '../interfaces/IProduct';
import { ToastContainer } from 'react-toastify';

//IMPORTING HOOKS AND DEPS
import { useEffect } from 'react';
import useProducts from '../hooks/useProducts';
import CombinedHeader from '../components/CombinedHeader';

const Kitchenware = () => {
  const { products, isLoading, getProductCategory } = useProducts();

  useEffect(() => {
    getProductCategory('kitchenware');
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

export default Kitchenware;
