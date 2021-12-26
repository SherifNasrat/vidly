import React from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from 'lodash';

class Movies extends React.Component {
  state = {
    currentPage: 1,
    genres: [],
    movies: [],
    pageSize: 4,
    sortColumn:{path:'title',order:'asc'}
  };

  componentDidMount() {
    const genres = [{ _id:"",name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
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

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSort = sortColumn => {

    this.setState({sortColumn});
  };
  getPagedData= () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sortedMovies = _.orderBy(filteredMovies,[sortColumn.path],[sortColumn.order]);

    const paginatedMovies = paginate(sortedMovies, currentPage, pageSize);
    return {totalCount: filteredMovies.length, data:paginatedMovies};
  };
  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumn
    } = this.state;
    if (count === 0) return <p>There are no movies in the database.</p>;
    const {totalCount,data:movies} = this.getPagedData();
    
    return (
      <div className="row" style={{ paddingTop: "10px" }}>
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable  movies={movies}
                        sortColumn={sortColumn} 
                        onLike={this.handleLike} 
                        onDelete = {this.handleDelete}
                        onSort={this.handleSort}/>
          <Pagination
            itemsCount={totalCount}
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
