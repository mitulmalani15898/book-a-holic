import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { pdfjs, Document, Page } from "react-pdf";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./book-preview.css";

import Pdf from "./CSCI4177_5709-A3_Requirements.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const BookPreview = ({ show, handleClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    return setPageNumber(1);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePreviousClick = () => {
    setPageNumber((prev) => (prev === 1 ? numPages : prev - 1));
  };

  const handleNextClick = () => {
    setPageNumber((prev) => (prev === numPages ? 1 : prev + 1));
  };

  return (
    <Modal show={show} onHide={handleClose} className="preview-modal">
      <Modal.Header closeButton>
        Page {pageNumber} of {numPages}
      </Modal.Header>
      <Modal.Body>
        <Document file={Pdf} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
          {/* {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
            <Page pageNumber={page} />
          ))} */}
        </Document>
      </Modal.Body>
      <Modal.Footer>
        <button className="prev-next-button" onClick={handlePreviousClick}>
          Prev
        </button>
        <button className="prev-next-button" onClick={handleNextClick}>
          Next
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookPreview;
