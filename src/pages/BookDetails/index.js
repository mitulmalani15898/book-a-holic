/**
 * @author Mitul Pravinbhai Malani (B00869519)
 * This component works as a wrapper for Books details page
 */
import Container from "react-bootstrap/Container";

import BookDetails from "../../components/BookDetails";

const BookDetailsPage = () => {
  return (
    <Container>
      <BookDetails />
    </Container>
  );
};

export default BookDetailsPage;
