//Ninad Nitin Shukla
//B00863694
import React, { useEffect, useState } from "react";
import { Document } from 'react-pdf/dist/esm/entry.webpack';

import { BASE_URL } from "../../utils/constants";
const BookData = () => {
    const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file={BASE_URL+"static/books/2.pdf"}
        onLoadSuccess={onDocumentLoadSuccess}
      >
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  );
}

    


export default BookData;