import Navbar from "./Navbar";
import Modal from "./Modal";

const Layout = ({ children }) => {
  return (
    <div className="content">
      <Navbar />
      {children}
      <Modal />
    </div>
  );
};

export default Layout;
