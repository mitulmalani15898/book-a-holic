/**
 * @author Mitul Pravinbhai Malani (B00869519)
 * BookCoverImage component, which represents book image everywhere in the project
 */
import DefaultBook from "../../static/images/DefaultBook.png";

const BookCoverImage = (props) => {
  return (
    <img
      {...props}
      alt="book-cover"
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = DefaultBook;
      }}
    />
  );
};

export default BookCoverImage;
