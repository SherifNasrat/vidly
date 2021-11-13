import React from "react";
import { getMovies } from "../services/fakeMovieService";
import {getGenres} from '../services/fakeGenreService';
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate} from "../utils/paginate";
import ListGroup from "./common/listGroup";

class Movies extends React.Component {
  state = {
    currentPage: 1,
    genres:[],
    movies:[],
    pageSize: 4,
  };

componentDidMount(){
  const genres = [{name:"All Genres"},...getGenres()];

  this.setState({movies:getMovies(),genres});
}

  handleDelete = (movieId) => {
    const movies = this.state.movies.filter((m) => m._id !== movieId);
    this.setState({ movies });
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({selectedGenre: genre, currentPage:1})
    console.log(genre);
  }
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage,selectedGenre, movies: allMovies } = this.state;
    if (count === 0) return <p>There are no movies in the database.</p>;

    const filteredMovies = selectedGenre && selectedGenre._id
    ? allMovies.filter(m=>m.genre._id === selectedGenre._id)
    : allMovies;

    console.log("Filtered Movies:"+filteredMovies)
    const movies = paginate(filteredMovies, currentPage, pageSize);

    return (
      <div className="row" style={{paddingTop:"10px"}}>
        <div className="col-3">
          <ListGroup items={this.state.genres}
                     onItemSelect={this.handleGenreSelect}
                     selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {filteredMovies.length} movies in the database.</p>
          <table className="table">
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
              {movies.map((m) => (
                <tr key={m._id}>
                  <td>{m.title}</td>
                  <td>{m.genre.name}</td>
                  <td>{m.numberInStock}</td>
                  <td>{m.dailyRentalRate}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(m._id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Like liked={m.liked} onClick={() => this.handleLike(m)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={filteredMovies.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
