import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { PatchMovieDTO } from './dto/patch-movie.dto';
import { Movie } from './entities/Movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAllMovies(): Movie[] {
    return this.movies;
  }

  getMovie(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);

    if (!movie) {
      throw new NotFoundException('영화를 찾지 못하였습니다.');
    } else {
      return movie;
    }
  }

  createMovie(movieJson: CreateMovieDTO): Movie {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieJson,
    });

    return this.movies[this.movies.length - 1];
  }

  deleteMovie(id: number) {
    this.getMovie(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  patchMovie(id: number, updateJson: PatchMovieDTO) {
    const movie = this.getMovie(id);
    this.deleteMovie(id);
    this.movies.push({ ...movie, ...updateJson });
  }
}
