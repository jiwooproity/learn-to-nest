import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { Query, Param, Body } from '@nestjs/common';
import { Movie } from './entities/Movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAllMovies(): Movie[] {
    return this.moviesService.getAllMovies();
  }

  @Get('search')
  searchMovie(@Query('year') searchingYear: string) {
    return `You found a movie since ${searchingYear}`;
  }

  @Get(':id')
  getMovie(@Param('id') movieId: string): Movie {
    return this.moviesService.getMovie(movieId);
  }

  @Post()
  createMovie(@Body() movieData) {
    return this.moviesService.createMovie(movieData);
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: string): boolean {
    return this.moviesService.deleteMovie(movieId);
  }

  @Patch(':id')
  patchMovie(
    @Param('id') movieId: string,
    @Body() updateJson: { title?: string; description?: string },
  ): { message: string; body: { title?: string; description?: string } } {
    return {
      message: `Pathcing a Movie ${movieId}`,
      body: updateJson,
    };
  }
}
