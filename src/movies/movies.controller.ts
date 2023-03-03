import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { Query, Param, Body } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { PatchMovieDTO } from './dto/patch-movie.dto';
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
  getMovie(@Param('id') movieId: number): Movie {
    return this.moviesService.getMovie(movieId);
  }

  @Post()
  createMovie(@Body() movieJson: CreateMovieDTO) {
    return this.moviesService.createMovie(movieJson);
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: number) {
    return this.moviesService.deleteMovie(movieId);
  }

  @Patch(':id')
  patchMovie(@Param('id') id: number, @Body() updateJson: PatchMovieDTO) {
    this.moviesService.patchMovie(id, updateJson);
  }
}
