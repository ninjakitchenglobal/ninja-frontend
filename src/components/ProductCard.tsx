//IMPORTING HELPER COMPONENTS

import { Link } from 'react-router-dom';

const ProductCard = ({
  title,

  price,
  picture,
  productId,
}: {
  title: string;
  price: number;
  picture?: string;
  productId?: string;
}) => {
  return (
    <Link to={`/product/${productId}`}>
      <div className="w-64 h-90 flex flex-col justify-between gap-3 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
        <span className="block h-70 relative">
          <img src={picture} alt="" className="w-full h-full" />
        </span>

        <span>
          <h3 className="font-semibold text-lg text-gray-800">
            {title.slice(0, 25) + '...'}
          </h3>
          <p className="mt-2 text-gray-700">${price}</p>
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
