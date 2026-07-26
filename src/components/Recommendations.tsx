//IMPORTING HOOKS
import { useEffect } from 'react';
import useProducts from '../hooks/useProducts';

//IMPORTING HELPER COMPONENTS
import ProductCard from './ProductCard';

//IMPORTING TYPES AND INTERFACES
import type IProduct from '../interfaces/IProduct';

const Recommendations = () => {
  const { recommendations, getPopularRecommendations, isLoading } =
    useProducts();

  useEffect(() => {
    getPopularRecommendations('get-recommendations');
  }, []);

  return (
    <section className="mt-15 px-5 py-5 md:px-10 md:mt-20 lg:px-15 lg:mt-25 bg-gray-200">
      <h1 className="text-2xl font-semibold md:text-3xl">
        Recommendations for you
      </h1>

      <div className="mt-10 flex justify-between gap-2 overflow-x-scroll">
        {isLoading ? (
          <span className="block loading loading-ring loading-xl w-25 text-gray-600 mx-auto"></span>
        ) : (
          recommendations?.map((item: IProduct, i: number) => {
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

export default Recommendations;
