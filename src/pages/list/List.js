import "./list.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatalbe from "../../components/datatable/Datatalbe";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatalbe />
      </div>
    </div>
  );
};

export default List;
