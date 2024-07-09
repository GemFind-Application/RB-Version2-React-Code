import { useCallback } from "react";
import Head2 from "../components/head2";
import { useNavigate } from "react-router-dom";
import FrameComponent5 from "../components/frame-component5";
import V from "../components/v";
import TableColumns from "../components/table-columns";
import "./compare.css";

const Compare = () => {
  const navigate = useNavigate();

  const onBreadContainerClick = useCallback(() => {
    navigate("/diamond");
  }, [navigate]);

  return (
    <div className="compare">
      <Head2 />
      <main className="empty">
        <div className="bread-wrapper">
          <div className="bread" onClick={onBreadContainerClick}>
            <div className="bread-inner">
              <img className="frame-child" alt="" src="/vector-11.svg" />
            </div>
            <b className="back-to-diamond">Back to Diamond List</b>
          </div>
        </div>
        <FrameComponent5 />
        <section className="table-up">
          <V />
          <V
            propBorderRadius="unset"
            propBorder="unset"
            propBorderTop="1px solid var(--stroke)"
            propBorderRight="1px solid var(--stroke)"
            propBorderBottom="1px solid var(--stroke)"
          />
          <V
            propBorderRadius="unset"
            propBorder="unset"
            propBorderTop="1px solid var(--stroke)"
            propBorderRight="1px solid var(--stroke)"
            propBorderBottom="1px solid var(--stroke)"
          />
          <V
            propBorderRadius="unset"
            propBorder="unset"
            propBorderTop="1px solid var(--stroke)"
            propBorderRight="1px solid var(--stroke)"
            propBorderBottom="1px solid var(--stroke)"
          />
          <V
            propBorderRadius="unset"
            propBorder="unset"
            propBorderTop="1px solid var(--stroke)"
            propBorderRight="1px solid var(--stroke)"
            propBorderBottom="1px solid var(--stroke)"
          />
          <V
            propBorderRadius="0px var(--br-9xs) 0px 0px"
            propBorder="unset"
            propBorderTop="1px solid var(--stroke)"
            propBorderRight="1px solid var(--stroke)"
            propBorderBottom="1px solid var(--stroke)"
          />
        </section>
        <section className="results1">
          <TableColumns
            shape="Shape"
            round="Round"
            round1="Round"
            round2="Round"
            round3="Round"
            round4="Round"
            round5="Round"
          />
          <TableColumns
            shape="#Sku"
            round="275587641"
            round1="275587641"
            round2="275587641"
            round3="275587641"
            round4="275587641"
            round5="275587641"
            propBorderBottom="unset"
          />
          <TableColumns
            shape="Carat"
            round="0.20"
            round1="0.20"
            round2="0.20"
            round3="0.20"
            round4="0.20"
            round5="0.20"
            propBorderBottom="unset"
          />
          <TableColumns
            shape="Table"
            round="56%"
            round1="56%"
            round2="56%"
            round3="56%"
            round4="56%"
            round5="56%"
            propBorderBottom="unset"
          />
          <TableColumns
            shape="Color"
            round="E"
            round1="E"
            round2="E"
            round3="E"
            round4="E"
            round5="E"
            propBorderBottom="unset"
          />
          <TableColumns
            shape="Polish"
            round="Very good"
            round1="Very good"
            round2="Very good"
            round3="Very good"
            round4="Very good"
            round5="Very good"
            propBorderBottom="unset"
          />
          <TableColumns
            shape="Symmetry"
            round="Excellent"
            round1="Excellent"
            round2="Excellent"
            round3="Excellent"
            round4="Excellent"
            round5="Excellent"
            propBorderBottom="unset"
          />
          <TableColumns
            shape="Clarity"
            round="VVS1"
            round1="VVS1"
            round2="VVS1"
            round3="VVS1"
            round4="VVS1"
            round5="VVS1"
            propBorderBottom="unset"
          />
          <TableColumns
            shape="Fluorescence"
            round="None"
            round1="None"
            round2="None"
            round3="None"
            round4="None"
            round5="None"
            propBorderBottom="unset"
          />
          <TableColumns
            shape="Depth"
            round="61.8%"
            round1="61.8%"
            round2="61.8%"
            round3="61.8%"
            round4="61.8%"
            round5="61.8%"
            propBorderBottom="unset"
          />
          <TableColumns
            shape="Measurement"
            round="3.78X3.8X2.34"
            round1="3.78X3.8X2.34"
            round2="3.78X3.8X2.34"
            round3="3.78X3.8X2.34"
            round4="3.78X3.8X2.34"
            round5="3.78X3.8X2.34"
            propBorderBottom="unset"
          />
          <TableColumns
            shape="Cert"
            round="GIA"
            round1="GIA"
            round2="GIA"
            round3="GIA"
            round4="GIA"
            round5="GIA"
            propBorderBottom="unset"
          />
          <TableColumns
            shape="Cut"
            round="Excellent"
            round1="Excellent"
            round2="Excellent"
            round3="Excellent"
            round4="Excellent"
            round5="Excellent"
            propBorderBottom="unset"
          />
          <TableColumns
            shape="Price"
            round="$712"
            round1="$712"
            round2="$712"
            round3="$712"
            round4="$712"
            round5="$712"
            propBorderBottom="1px solid var(--stroke)"
          />
        </section>
      </main>
      <footer className="pagination2">
        <div className="back-to-diamond">
          © 2024 GemFind App Store Powered by GemFind.
        </div>
      </footer>
    </div>
  );
};

export default Compare;
