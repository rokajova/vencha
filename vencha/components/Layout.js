import Navbar from "./Navbar";
import Modal from "./Modal";

const Layout = ({ children }) => {
  return (
    <div className="content">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
