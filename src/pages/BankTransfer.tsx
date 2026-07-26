import CombinedHeader from '../components/CombinedHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../lib/redux/hooks';
import { toast } from 'react-toastify';
import { DEV_API } from '../lib/utils/api-url';
import usePayment from '../hooks/usePayment';

//IMPORTING TYPES AND INTERFACES
import type IProduct from '../interfaces/IProduct';

//IMPORTING PAGE ASSETS
import imagePlaceholder from '../assets/image-gallery.png';

const BankTransfer = () => {
  const cart = useAppSelector((store) => store.cartReducer);
  const {
    imagePreview,
    setImagePreview,
    setFile,
    confirmPayment,
    purchaseDetails,
    setPurchaseDetails,
    isPurchaseLoading,
  } = usePayment();

  const [products, setProducts] = useState<IProduct[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //FOR RECEIPT PROCESSING

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${DEV_API}/product/get-particular-products`,
          {
            params: {
              productIds: cart.join(','),
            },
          },
        );

        setProducts(res.data.data);

        setIsLoading(false);
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message);
          console.log(error);
          setIsLoading(false);
        } else {
          console.log(error);
          toast.error('Something went wrong with your request');
          setIsLoading(false);
        }
      }
    };

    getProducts();
  }, []);

  //PAGE FUNCTIONS
  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setImagePreview(url);
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setPurchaseDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  return (
    <>
      <CombinedHeader />
      {isLoading ? (
        <section className="flex justify-center mt-70">
          <span className="loading loading-ring loading-xl w-25 block" />
        </section>
      ) : (
        <section className="mt-30 px-10 md:mt-50">
          <div className="mb-10">
            <h1 className="text-2xl text-gray-700 font-semibold">
              {' '}
              Payment processing for:{' '}
            </h1>
            <ul className="text-gray-700 list-disc relative left-5">
              {products?.map((product: IProduct, i: number) => {
                return (
                  <li key={i} className="text-xs">
                    {' '}
                    {product.title.slice(0, 40)}... - ${product.price}{' '}
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-gray-700 font-semibold text-xl">
              Paying via: Bank Transfer
            </p>
            <p className="font-semibold text-gray-700">
              Total: $
              {products?.reduce(
                (sum, product: IProduct) => sum + product.price,
                0,
              )}
            </p>
          </div>

          <section className="text-gray-700">
            <div className=" mx-auto border-2 border-gray-400 p-5 rounded-lg">
              <p className="my-2">
                Read the instructions carefully Your customer care
                representative is AMELIA MOSS and she will be in charge of your
                order
              </p>
              <ul className="my-2 list-disc px-10">
                <li> Send your email and shipping address.</li>
                <li>
                  Make your transfer to the account given below, confirm the
                  name and send a receipt of payment.
                </li>
              </ul>

              <div className="bg-slate-600 text-white font-semibold text-sm md:text-base rounded-lg mx-auto mt-5 p-2 flex flex-col gap-4">
                <p>Bank name: Wells Fargo</p>
                <p>Bank address: 2025 Town Lake pkwy. Woodstock, GA. 30188</p>
                <p>Routing number : 121000248 (domestic wire transfers)</p>
                <p>
                  Routing number: 061000227 (direct deposit and electronic
                  payment){' '}
                </p>
                <p>Account number: 2594884971</p>
                <p>Receiver name: Amelia Moss</p>
                <p>Receiver address:187 Darla Drive Woodstock, GA. 30188</p>
              </div>

              <section className="my-2 flex flex-col gap-2">
                <input
                  type="text"
                  className="border-2 border-gray-400 outline-hidden p-2 rounded-lg"
                  name="email"
                  placeholder="Enter your email"
                  value={purchaseDetails?.email}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="border-2 border-gray-400 outline-hidden p-2 rounded-lg"
                  name="address"
                  placeholder="Enter your shipping address"
                  value={purchaseDetails?.address}
                  onChange={handleChange}
                />

                <label
                  htmlFor="image"
                  className="flex items-center justify-center border-4 h-70 w-65 mx-auto rounded-lg cursor-pointer"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="" className="w-full h-full" />
                  ) : (
                    <img src={imagePlaceholder} alt="" className="w-30" />
                  )}
                  <input
                    id="image"
                    type="file"
                    name="picture"
                    placeholder="Product picture URL"
                    onChange={handleFileChange}
                    className="py-2 px-4 border rounded-lg w-full hidden"
                  />
                </label>

                <button
                  onClick={() => {
                    setFile(null);
                    setImagePreview('');
                  }}
                  className="bg-gray-400 rounded-lg p-2 text-white w-65 mx-auto block"
                >
                  {' '}
                  Delete Image{' '}
                </button>

                <button
                  onClick={confirmPayment}
                  className="py-2 px-4 bg-black text-white rounded-lg text-lg font-semibold flex justify-center cursor-pointer w-65 mx-auto"
                >
                  {isPurchaseLoading ? (
                    <span className="loading loading-ring loading-xl font-bold text-white block"></span>
                  ) : (
                    ' Proceed'
                  )}
                </button>
              </section>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default BankTransfer;
