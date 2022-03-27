import "./order-history.css";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";

function Orders() {
  const [ordersList, setOrdersList] = useState([]);
  const [filteredList, setFilteredList] = useState(ordersList);
  const [sortType, setSortType] = useState("asc");
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/orders/abhi@dal.ca").then((res) => {
      setOrdersList(res.data.data);
      setFilteredList(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (query) {
      let result = ordersList.filter((res) => {
        console.log(res);
        return (
          res.bookName.toLowerCase().search(query) !== -1 ||
          res.purchaseDate.slice(0, 10).toLowerCase().search(query) !== -1 ||
          res._id.toLowerCase().search(query) !== -1
        );
      });
      setFilteredList(result);
    } else {
      setFilteredList(ordersList);
    }
  }, [query]);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    setQuery(value);
  };

  useEffect(() => {
    const desc = (a, b) => {
      return (
        new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime()
      );
    };

    const asc = (a, b) => {
      return (
        new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
      );
    };

    if (sortType === "asc") {
      const newItems = filteredList.sort(asc);
      setFilteredList([...newItems]);
    } else if (sortType === "desc") {
      const newItems = filteredList.sort(desc);
      setFilteredList([...newItems]);
    }
  }, [sortType]);

  return (
    <div>
      <div className="order-searchsort-div">
        <div className="order-search-bar">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search by order id, book..."
            onChange={(event) => handleSearch(event)}
          />
          <div className="search-icon-wrapper">
            <FontAwesomeIcon
              icon={faSearch}
              color="#0166B2"
              className="search-icon"
            />
          </div>
        </div>
        <div className="sort-div">
          <DropdownButton
            id="dropdown-basic-button"
            title="Sort By Date"
            className="order-sort"
          >
            <Dropdown.Item onClick={(event) => setSortType("asc")}>
              Ascending Order
            </Dropdown.Item>
            <Dropdown.Item onClick={(event) => setSortType("desc")}>
              Descending Order
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      {filteredList.length === 0 && <div>No Orders Found.</div>}
      {filteredList &&
        filteredList.map((res) => (
          <div className="order-container" key={res.id}>
            <div className="order-card">
              <p className="order-heading">Order ID:</p>
              <p className="order-content">{res._id}</p>
              <div className="review-button">Write a Review</div>
            </div>
            <div className="order-card">
              <p className="order-heading">Book Name:</p>
              <p className="order-content">{res.bookName}</p>
            </div>
            <div className="order-card">
              <p className="order-heading">Purchase Date:</p>
              <p className="order-content">{res.purchaseDate.slice(0, 10)}</p>
            </div>
            <div className="order-card">
              <p className="order-heading">Amount:</p>
              <p className="order-content">{res.amount}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Orders;
