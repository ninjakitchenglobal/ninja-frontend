import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastProvider() {
  console.log('Toast provider mounted');
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={true}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="light"
    />
  );
}
