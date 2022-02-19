import React from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import _ from 'lodash';
import {Link} from 'react-router-dom';

class Movies extends React.Component {
  state = {
    currentPage: 1,
    genres: [],
    movies: [],
    pageSize: 4,
    searchQuery:"",
    selectedGenre:null,
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
    this.setState({ selectedGenre: genre,searchQuery:"" ,currentPage: 1 });
  };
  handleSearch = query => {
    this.setState({searchQuery:query, selectedGenre:null, currentPage:1});
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
      sortColumn,
      searchQuery
    } = this.state;

    let filtered = allMovies;
    if(searchQuery)
    {
      filtered=allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    }
    else if(selectedGenre && selectedGenre._id)
    {
      filtered=allMovies.filter(m=>m.genre._id===selectedGenre._id)
    }

    const sortedMovies = _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);

    const paginatedMovies = paginate(sortedMovies, currentPage, pageSize);
    return {totalCount: filtered.length, data:paginatedMovies};
  };
  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery
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
          <Link to="/movies/new" className="btn btn-primary" style={{marginBottom:20}}>New Movie</Link>
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch}/>
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
