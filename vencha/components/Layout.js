import Collapsible from "./Collapsible";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="content">
      <Navbar />
      <Collapsible />
      <Collapsible />
      <Collapsible />
      {children}
    </div>
  );
};

export default Layout;
