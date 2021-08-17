import Collapsible from "./Collapsible";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="content">
      {/* <Navbar /> */}
      <Collapsible />
      {/* main */}
      {children}
    </div>
  );
};

export default Layout;
