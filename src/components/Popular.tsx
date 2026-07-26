//IMPORTING HOOKS
import useProducts from '../hooks/useProducts';
import { useEffect } from 'react';

//IMPORTING HELPER COMPONENTS
import ProductCard from './ProductCard';

//IMPORTING TYPES AND INTERFACES
import type IProduct from '../interfaces/IProduct';

const Popular = () => {
  const { popular, isLoading, getPopularRecommendations } = useProducts();

  useEffect(() => {
    getPopularRecommendations('get-popular');
  }, []);

  return (
    <section className="mt-15 px-5 py-5 md:px-10 md:mt-20 lg:px-15 lg:mt-25">
      <h1 className="text-2xl font-semibold md:text-3xl">
        Most Popular Right Now
      </h1>

      <div className="mt-10 flex justify-between gap-2 overflow-x-scroll">
        {isLoading ? (
          <span className="block loading loading-ring loading-xl w-25 text-gray-600 mx-auto"></span>
        ) : (
          popular?.map((item: IProduct, i: number) => {
            const { title, picture, price, _id } = item;
            return (
              <ProductCard
                key={i}
                title={title}
                picture={picture}
                price={price}
                productId={_id}
              />
            );
          })
        )}
      </div>
    </section>
  );
};

export default Popular;
