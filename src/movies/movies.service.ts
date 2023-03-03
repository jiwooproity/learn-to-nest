import { Injectable } from '@nestjs/common';
import { CreateMovie, Movie } from './entities/Movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [
    {
      id: 1,
      title: 'Iron Man 2',
      year: 2022,
      genres: ['action', 'hero', 'marvel'],
    },
    {
      id: 2,
      title: '아바타 2',
      year: 2022,
      genres: ['action', 'expensive', 'marvel'],
    },
    {
      id: 3,
      title: '해리포터 : 죽음의 성물',
      year: 2022,
      genres: ['action', 'magic', 'marvel'],
    },
  ];

  getAllMovies(): Movie[] {
    return this.movies;
  }

  getMovie(id: string): Movie {
    return this.movies.find((movie) => movie.id === +id);
  }

  createMovie(movieData: CreateMovie): Movie {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });

    return this.movies[this.movies.length - 1];
  }

  deleteMovie(id: string): boolean {
    this.movies.filter((movie) => movie.id !== +id);
    return true;
  }
}
