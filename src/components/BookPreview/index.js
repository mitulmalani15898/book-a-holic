// Author: Mitul Pravinbhai Malani (B00869519)
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { pdfjs, Document, Page } from "react-pdf";

import { BASE_URL } from "../../utils/constants";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./book-preview.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const BookPreview = ({ show, handleClose, bookPdf, preview }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(preview ? 10 : numPages);
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
        {numPages && (
          <>
            Page {pageNumber} of {numPages}
          </>
        )}
      </Modal.Header>
      <Modal.Body className="h-100">
        <Document
          file={`${BASE_URL + bookPdf}`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </Modal.Body>

      {numPages && (
        <Modal.Footer>
          <button className="prev-next-button" onClick={handlePreviousClick}>
            Prev
          </button>
          <button className="prev-next-button" onClick={handleNextClick}>
            Next
          </button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default BookPreview;
