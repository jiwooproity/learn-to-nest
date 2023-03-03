import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { Param, Body } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAllMovies(): { title: string; description: string } {
    return {
      title: 'Iron Man 2',
      description: '철의 남자 2',
    };
  }

  @Get('/:id')
  getMovie(@Param('id') movieId: string): { id: string } {
    return {
      id: movieId,
    };
  }

  @Post()
  createMovie(
    @Body('title') title: string,
    @Body('description') description: string,
  ): string {
    return `영화 제목 : ${title}, 영화 설명 : ${description}`;
  }

  @Delete('/:id')
  deleteMovie(@Param('id') movieId: string): { message: string } {
    return {
      message: `You did delete a movie - movie id is ${movieId}`,
    };
  }

  @Patch('/:id')
  patchMovie(@Param('id') movieId: string): string {
    return `Pathcing a Movie ${movieId}`;
  }
}
