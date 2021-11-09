import React from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import {paginate, Paginate} from '../utils/paginate';

class Movies extends React.Component {
  state = {
    currentPage:1,
    movies: getMovies(),
    pageSize:4
  };

  handleDelete = movieId =>
  {
      const movies = this.state.movies.filter(m=>m._id !== movieId)
      this.setState({movies})

  }
  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index]={...movies[index]};
    movies[index].liked=!movies[index].liked
    this.setState({movies});
  };
  handlePageChange = page =>
  {
    this.setState({currentPage:page})
  }
  render() {
    const {length:count} = this.state.movies;
    const {pageSize, currentPage, movies:allMovies} = this.state;
    if(count===0)
    return <p>There are no movies in the database.</p>
    
    const movies = paginate(allMovies,currentPage,pageSize);

    return (
      <div>
          <p>Showing {count} movies in the database.</p>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
              {movies.map(m =>(
                  <tr key={m._id}>
                  <td>{m.title}</td>
                  <td>{m.genre.name}</td>
                  <td>{m.numberInStock}</td>
                  <td>{m.dailyRentalRate}</td>
                  <td><button className='btn btn-danger' onClick={()=>this.handleDelete(m._id)}>Delete</button></td>
                  <td><Like liked={m.liked} onClick={()=>this.handleLike(m)}/></td>
                  </tr>
              )
              )}
          </tbody>
        </table>
        <Pagination 
        itemsCount={count} 
        currentPage={currentPage}
        pageSize={pageSize} 
        onPageChange={this.handlePageChange}/>
      </div>
    );
  }
}

export default Movies;
