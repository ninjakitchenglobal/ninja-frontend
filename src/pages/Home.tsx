//HELPER COMPONENTS
import Recommendations from '../components/Recommendations';
import CombinedHeader from '../components/CombinedHeader';
import Popular from '../components/Popular';

//IMPORTING DEPS
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

//IMPORTING PAGE ASSETS
import logo from '../assets/ninja-logo.webp';
import image11 from '../assets/11.png';
import image12 from '../assets/12.png';
import image13 from '../assets/13.png';
import poster from '../assets/poster.png';
import homeVideo from '../assets/1.mp4';

const Home = () => {
  const submitEmail = () => {
    alert('Email submitted');
  };

  return (
    <>
      <CombinedHeader />

      {/* HERO SECTION */}
      <section className="">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
        />
        <div className="relative mt-15 md:mt-40">
          <div className="absolute top-o left-o w-screen h-162.5 overflow-hidden -z-10 ">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={poster}
              className="w-full h-full object-cover"
            >
              <source src={homeVideo} type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="px-5 relative top-60 md:px-10 lg:px-15">
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl md:w-[60%]">
            {' '}
            Innovative Kitchen Appliances Designed For Life{' '}
          </h1>
          <button className="bg-[#D85827] text-white font-semibold text-xl py-2 px-4 rounded-xl mt-5 hover:scale-110 transition-all duration-300 cursor-pointer">
            {' '}
            Shop Now{' '}
          </button>
        </div>
      </section>

      {/* BONUSES */}
      <section className="flex flex-col gap-5 mt-150 px-5 md:px-10 lg:px-15 md:flex-row">
        <Link to={'/all-products'}>
          <div>
            <img src={image11} alt="" />
          </div>
        </Link>

        <div className="flex flex-col gap-5">
          <Link to={'/all-products'}>
            {' '}
            <img src={image12} alt="" />
          </Link>
          <Link to={'/all-products'}>
            {' '}
            <img src={image13} alt="" />
          </Link>
        </div>
      </section>

      {/* POPULAR */}
      <Popular />

      {/* RECOMMENDATIONS */}
      <Recommendations />

      {/* FOOTER */}
      <footer className="mt-15 px-5 py-5 md:px-10 md:mt-20 lg:px-15 lg:mt-25 bg-gray-200 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <img src={logo} alt="" className="w-24" />
          <span className="mt-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Email"
              className="py-2 px-4 outline-none bg-white rounded-lg border"
            />
            <button
              onClick={submitEmail}
              className="bg-black text-white font-semibold py-2 px-4 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105"
            >
              SUBSCRIBE
            </button>
          </span>
        </div>

        <div className="text-gray-700">Copyright Ninja Kitchen tools</div>
      </footer>
    </>
  );
};

export default Home;
