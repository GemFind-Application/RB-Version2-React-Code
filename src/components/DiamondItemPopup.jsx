import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const DiamondDetailsPopup = ({ diamond, onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const productCard = popupRef.current.closest('.product-card');
    if (productCard) {
      const { height } = productCard.getBoundingClientRect();
      popupRef.current.style.height = `${height}px`;
    }
  }, []);

  return (
    <div className="diamond-details-popup" ref={popupRef}>
      <div className="popup-header">
        <h2>Diamond Details</h2>
        <button className="close-button" onClick={onClose}>...</button>
      </div>
      <div className="popup-content">
        <DetailRow label="Diamond ID:" value={diamond.diamondId} />
        <DetailRow label="Shape:" value={diamond.shape} />
        <DetailRow label="Carat:" value={diamond.carat} />
        <DetailRow label="Color:" value={diamond.color} />
        <DetailRow label="Intensity:" value={diamond.intensity || '-'} />
        <DetailRow label="Clarity:" value={diamond.clarity} />
        <DetailRow label="Cut:" value={diamond.cut} />
        <DetailRow label="Depth:" value={diamond.depth} />
        <DetailRow label="Table:" value={`${diamond.table}%`} />
        <DetailRow label="Polish:" value={diamond.polish} />
        <DetailRow label="Symmetry:" value={diamond.symmetry} />
        <DetailRow label="Measurement:" value={diamond.measurement} />
        <DetailRow label="Certificate:" value={diamond.certificate} />
        <DetailRow label="Price:" value={`$${diamond.price.toLocaleString()}`} />
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="detail-row">
    <span className="detail-label">{label}</span>
    <span className="detail-value">{value}</span>
  </div>
);

DiamondDetailsPopup.propTypes = {
  diamond: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DiamondDetailsPopup;