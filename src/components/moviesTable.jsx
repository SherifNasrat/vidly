import React from "react";
import { Link } from "react-router-dom";
import Like from "../components/common/like";
import Table from "./common/table";

class MoviesTable extends React.Component {
  columns = [
    { path: "title", label: "Title",content:movie=> <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "delete",
      content: movie => (
        <button className="btn btn-danger" onClick={() => this.props.onDelete(movie._id)}>
          Delete
        </button>
      ),
    },
    {
      key: "like",
      content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />,
    },
  ];
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  render() {
    const { movies, sortColumn,onSort} = this.props;
    return (
      <Table columns={this.columns} data={movies} sortColumn={sortColumn} onSort={onSort} />
    );
  }
}
export default MoviesTable;
