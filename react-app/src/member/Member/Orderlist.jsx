import Sidebar from "../Sidebar";
import '../Member/Orderlist.css';
import OrderHistory from "../OrderHistory";

function OrderHistoryPage() {
  return (
    <div className="order-history-layout">
      <div className="order-history-sidebar">
        <Sidebar />
      </div>
      <div className="order-history-main">
        <OrderHistory />
      </div>
    </div>
  );
}

export default OrderHistoryPage;
