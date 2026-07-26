import useAdmin from '../hooks/useAdmin';
import { useEffect } from 'react';
import type IProduct from '../interfaces/IProduct';

//IMPORTING HELPER COMPONENTS
import AdminProductCard from '../components/AdminProductCard';
import CombinedHeader from '../components/CombinedHeader';
import { ToastContainer } from 'react-toastify';

//IMPORTING PAGE ASSETS
import imagePlaceholder from '../assets/image-gallery.png';

const AdminPage = () => {
  const {
    getProducts,
    isAddLoading,
    isLoading,
    products,
    handleChange,
    productDetails,
    addProduct,
    navigate,
    setProducts,
    handleFileChange,
    imagePreview,
  } = useAdmin();

  useEffect(() => {
    getProducts();
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
      <section className="mt-50">
        <div className="p-5">
          <h1 className="text-2xl font-semibold text-gray-600 text-center">
            {' '}
            Input product details here{' '}
          </h1>

          <span className="flex flex-col gap-2 mt-10">
            <label
              htmlFor="image"
              className="flex items-center justify-center border-4 h-70 rounded-lg w-full cursor-pointer"
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

            <input
              type="text"
              name="title"
              value={productDetails.title}
              placeholder="Product title"
              onChange={handleChange}
              className="py-2 px-4 border rounded-lg w-full"
            />
            <textarea
              name="description"
              value={productDetails.description}
              placeholder="Product description"
              onChange={handleChange}
              className="py-2 px-4 border rounded-lg w-full resize-none h-30"
            />
            <input
              type="number"
              name="price"
              placeholder="Product price"
              onChange={handleChange}
              className="py-2 px-4 border rounded-lg w-full"
            />

            <select
              name="category"
              id="category"
              className="py-2 px-4 border rounded-lg w-full"
              onChange={handleChange}
            >
              <option value="">Select a product category</option>
              <option value="popular">Popular</option>
              <option value="recommendations">Recommendations</option>
              <option value="kitchenware">Kitchenware</option>
              <option value="bundle-and-save">Bundle and save</option>
              <option value="accessories-and-parts">
                Accessories and Parts
              </option>
              <option value="blenders-and-juicers">Blenders and Juicers</option>
              <option value="kitchen-appliances">Kitchen Appliances</option>
            </select>

            <span className="flex flex-col gap-2 items-center">
              <button
                onClick={addProduct}
                className="py-2 px-4 bg-black text-white rounded-lg text-lg font-semibold flex justify-center cursor-pointer w-90"
              >
                {isAddLoading ? (
                  <span className="loading loading-ring loading-xl font-bold text-white block"></span>
                ) : (
                  ' Add Product'
                )}
              </button>

              <button
                onClick={() => {
                  navigate('/admin/chats');
                }}
                className="py-2 px-4 bg-black text-white rounded-lg text-lg font-semibold flex justify-center cursor-pointer w-90"
              >
                {isAddLoading ? (
                  <span className="loading loading-ring loading-xl font-bold text-white block"></span>
                ) : (
                  ' Admin chat'
                )}
              </button>

              <button
                onClick={() => {
                  navigate('/admin/purchases');
                }}
                className="py-2 px-4 bg-black text-white rounded-lg text-lg font-semibold flex justify-center cursor-pointer w-90"
              >
                {isAddLoading ? (
                  <span className="loading loading-ring loading-xl font-bold text-white block"></span>
                ) : (
                  'Purchases'
                )}
              </button>
            </span>
          </span>
        </div>

        {isLoading ? (
          <section className="flex justify-center mt-30">
            <span className="loading loading-ring loading-xl w-25 text-gray-500 block"></span>
          </section>
        ) : (
          <div className="flex flex-wrap items-center gap-4 p-5 mt-10">
            {products?.map((item: IProduct, i: number) => {
              return (
                <AdminProductCard
                  key={i}
                  title={item.title}
                  price={item.price}
                  picture={item.picture}
                  productId={item._id}
                  setProducts={setProducts}
                />
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default AdminPage;
