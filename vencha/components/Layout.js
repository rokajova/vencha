import Collapsible from "./Collapsible";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="content">
      <Navbar />
      <Collapsible label="Collapsible">
        <h2>Collapsible</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
          similique aliquid nostrum a, iusto cumque aut laboriosam autem.
          Quaerat, officia.
        </p>
      </Collapsible>
      <Collapsible label="Expand!">
        <ul>
          <li>List!</li>
          <li>List!</li>
          <li>List!</li>
          <li>List!</li>
          <li>List!</li>
        </ul>
      </Collapsible>
      <Collapsible label="🎁">
        <form>
          <h3>Title</h3>
          <input type="text" />
          <h3>Content</h3>
          <textarea />
          <h3>Image or Video</h3>
          <input type="file" />
          <button>CREATE</button>
        </form>
      </Collapsible>
      {children}
    </div>
  );
};

export default Layout;
