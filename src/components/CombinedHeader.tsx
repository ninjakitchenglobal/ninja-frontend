import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';
import Sidebar from './Sidebar';
import { useState } from 'react';

const CombinedHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <div className="block md:hidden">
        <MobileHeader setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      <div className="hidden md:block">
        <DesktopHeader />
      </div>

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </>
  );
};

export default CombinedHeader;
