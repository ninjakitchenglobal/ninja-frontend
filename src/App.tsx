import { Routes, Route } from 'react-router-dom';

//IMPORTING PAGES
import Home from './pages/Home';
import AccessoriesAndParts from './pages/Accessories_And_Parts';
import ProfilePage from './pages/Profile';
import LoginPage from './pages/Login';
import CartPage from './pages/Cart';
import AllProducts from './pages/All_Products';
import KitchenAppliances from './pages/Kitchen-Appliances';
import Kitchenware from './pages/Kitchenware';
import BlendersAndJuicers from './pages/Blenders-And-Juicers';
import BundleAndSave from './pages/Bundle-And-Save';
import ProductPage from './pages/Product';
import PurchaseChatPage from './pages/Admin_Chat_List';
import AdminPage from './pages/Admin-Page';
import PaymentOptionsPage from './pages/Make-Payment';
import PaymentConfirmation from './pages/Payment-Confirmation';
import AdminPurchases from './pages/Admin-Purchases';
import { ToastContainer } from 'react-toastify';
import Zelle from './pages/Zelle';
import BankTransfer from './pages/BankTransfer';
import PaymentOptions from './pages/PaymentOptions';
import Orders from './pages/Orders';
import OrderProgress from './pages/OrderProgress';

const App = () => {
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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/accessories-and-parts"
          element={<AccessoriesAndParts />}
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/kitchen-appliances" element={<KitchenAppliances />} />
        <Route path="/blenders-and-juicers" element={<BlendersAndJuicers />} />
        <Route path="/kitchenware" element={<Kitchenware />} />
        <Route path="/bundle-and-save" element={<BundleAndSave />} />
        <Route path="/product/:productId" element={<ProductPage />} />

        <Route path="/make-payment" element={<PaymentOptionsPage />} />

        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/chats" element={<PurchaseChatPage />} />

        <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
        <Route path="/admin/purchases" element={<AdminPurchases />} />
        <Route
          path="/payment-options/bank-transfer"
          element={<BankTransfer />}
        />
        <Route path="/payment-options/zelle" element={<Zelle />} />
        <Route path="/payment-options" element={<PaymentOptions />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order-progress/:purchaseId" element={<OrderProgress />} />
      </Routes>
    </>
  );
};

export default App;
