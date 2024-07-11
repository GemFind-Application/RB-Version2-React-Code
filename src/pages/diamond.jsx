import React, { useState, useEffect } from 'react';
import Head1 from "../components/head1";
import FrameComponent1 from "../components/frame-component1";
import FrameComponent2 from "../components/frame-component2";
import Items from "../components/items";
import PaginationPanel from "../components/pagination-panel";
import "./diamond.css";

const Diamond = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalProducts, setTotalProducts] = useState(0);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (number) => {
    setItemsPerPage(number);
    setCurrentPage(1);
  };
  return (
    <div className="diamond">
      <Head1 />
      <FrameComponent1 />
      <FrameComponent2 />
      <div className="list2">
        <Items />
        <Items propLeft="546px" propTop="24px" />
        <Items propLeft="972px" propTop="24px" />
        <Items propLeft="1398px" propTop="24px" />
        <Items propLeft="120px" propTop="504px" />
        <Items propLeft="546px" propTop="504px" />
        <Items propLeft="972px" propTop="504px" />
        <Items propLeft="1398px" propTop="504px" />
      </div>
      <PaginationPanel 
       currentPage={currentPage}
       itemsPerPage={itemsPerPage}
       totalItems={totalProducts}
       onPageChange={handlePageChange}
       onItemsPerPageChange={handleItemsPerPageChange}/>
    </div>
  );
};

export default Diamond;
