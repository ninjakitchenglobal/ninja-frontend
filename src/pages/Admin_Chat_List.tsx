//IMPORTING HOOKS AND DEPS
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DEV_API } from '../lib/utils/api-url';

//IMPORTING HELPER COMPONENTS
import type IProduct from '../interfaces/IProduct';
import { Link } from 'react-router-dom';
import CombinedHeader from '../components/CombinedHeader';

interface Messages {
  senderId: string;
  text: string;
  timestamps: any;
}

interface Chat {
  _id: string;
  buyerId: string;
  sellerId: string;
  products: IProduct[];
  paymentOption: string;
  messages: Messages[];
}

const PurchaseChatPage = () => {
  const [chats, setChats] = useState<Chat[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getChats = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${DEV_API}/chat/get-admin-chats/6988e97855e9a3d54af22435`,
        );
        setChats(res.data.data);
        setIsLoading(false);
      } catch (error: any) {
        console.log(error.response);
        toast.error(error.response.message);
        setIsLoading(false);
      }
    };

    getChats();
  }, []);

  if (!chats) {
    return (
      <>
        <CombinedHeader />

        <section className="mt-30 p-5 md:p-10 lg:p-15 xl:p-20">
          <h1 className="text-2xl text-gray-700 font-semibold">
            {' '}
            Current purchase chats{' '}
          </h1>

          <h2 className="text-center text-gray-700 mt-5 font-semibold">
            {' '}
            You currently have no ongoing or processed purchases{' '}
          </h2>
        </section>
      </>
    );
  }

  return (
    <>
      <CombinedHeader />

      <section className="mt-30 p-5 md:p-10 lg:p-15 xl:p-20">
        <h1 className="text-2xl text-gray-500 font-semibold mb-5">
          {' '}
          Current purchase chats{' '}
        </h1>

        {isLoading ? (
          <section className="flex justify-center mt-70">
            <span className="loading loading-ring loading-xl w-25 tet-gray-500 block"></span>
          </section>
        ) : (
          <div className="flex flex-col gap-3">
            {chats.map((item: Chat, i: number) => {
              return (
                <Link to={`/customer-care-chat/${item._id}`} key={i}>
                  <span className="block border rounded-lg py-2 px-4 cursor-pointer transition-all duration-300 hover:bg-gray-200">
                    <h3 className="text-gray-700 font-semibold">
                      {' '}
                      {item.products[0].title.slice(0, 50)}...{' '}
                    </h3>
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default PurchaseChatPage;
