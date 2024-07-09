import Head2 from "../components/head2";
import FrameComponent4 from "../components/frame-component4";
import FrameComponent3 from "../components/frame-component3";
import ProductDetails from "../components/product-details";
import "./complete.css";

const Complete = () => {
  return (
    <div className="complete">
      <Head2 />
      <FrameComponent4 />
      <div className="complete-inner">
        <div className="frame-parent">
          <FrameComponent3 />
          <ProductDetails />
        </div>
      </div>
      <div className="pagination5">
        <div className="gemfind-app-store4">
          © 2024 GemFind App Store Powered by GemFind.
        </div>
      </div>
    </div>
  );
};

export default Complete;
