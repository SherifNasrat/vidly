import React from "react";
import Like from '../components/common/like';

class MoviesTable extends React.Component {
  raiseSort= path => {
    const sortColumn = {...this.props.sortColumn};
    if(sortColumn.path===path) 
    sortColumn.order = (sortColumn.order==='asc') ? 'desc' : 'asc';
    else
    {
      sortColumn.path=path;
      sortColumn.order='asc';
    }
    this.props.onSort(sortColumn);
  }
  render() { 
    const { movies,onDelete,onLike } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={()=>this.raiseSort('title')} scope="col">Title</th>
            <th onClick={()=>this.raiseSort('genre.name')} scope="col">Genre</th>
            <th onClick={()=>this.raiseSort('numberInStock')} scope="col">Stock</th>
            <th onClick={()=>this.raiseSort('dailyRentalRate')} scope="col">Rate</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => (
            <tr key={m._id}>
              <td>{m.title}</td>
              <td>{m.genre.name}</td>
              <td>{m.numberInStock}</td>
              <td>{m.dailyRentalRate}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(m._id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <Like liked={m.liked} onClick={() => onLike(m)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default MoviesTable;
