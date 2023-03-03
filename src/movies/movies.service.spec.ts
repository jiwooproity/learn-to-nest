import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 읽어 들이기 시작.
  describe('getAllMovies', () => {
    // 원하는 테스트에 대한 동작 설명
    it('should return an array', () => {
      service.createMovie({
        title: 'asd',
        year: 2023,
        genres: ['123'],
      });

      // service에 담긴 Rest API 동작.
      const result = service.getAllMovies();
      // 조회 시, result에 담기는 값이 Array일 경우 이 테스트는 성공
      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toBeInstanceOf(Object);
    });
  });

  describe('createMovie and getMovie', () => {
    it('should be create movie', () => {
      const result = service.createMovie({
        title: 'asd',
        year: 2022,
        genres: ['asd', 'asd', 'asd'],
      });
      expect(result).toBeInstanceOf(Object);
    });

    it('should be find an object', () => {
      service.createMovie({
        title: 'asd',
        year: 2023,
        genres: ['123'],
      });

      const result = service.getMovie(1);
      expect(result).toBeInstanceOf(Object);
      expect(result.id).toEqual(1);
    });

    it('should throw 404 error pipe', () => {
      try {
        service.getMovie(2);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('영화를 찾지 못하였습니다.');
      }
    });
  });

  describe('deleteMovie', () => {
    it('should be delete a movie : once', () => {
      service.createMovie({
        title: 'asd',
        year: 2023,
        genres: ['123'],
      });

      const allMovies = service.getAllMovies().length;
      service.deleteMovie(1);
      const afterDelete = service.getAllMovies().length;

      expect(allMovies).toBeGreaterThan(afterDelete);
    });

    it('return 404 error status', () => {
      try {
        service.getMovie(2);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('createMovie', () => {
    it('Just create movie', () => {
      const prevMovieLength = service.getAllMovies().length;

      const result = service.createMovie({
        title: 'asd',
        year: 2023,
        genres: ['sad'],
      });

      const nowMovieLength = service.getAllMovies().length;

      expect(result).toBeInstanceOf(Object);
      expect(prevMovieLength).toBeLessThan(nowMovieLength);
    });
  });

  describe('patchMovie', () => {
    it("Let's Patching a movie", () => {
      service.createMovie({
        title: '변경 전',
        year: 2023,
        genres: ['asd'],
      });

      service.patchMovie(1, { title: '변경 후' });
      const movie = service.getMovie(1);
      expect(movie.title).toEqual('변경 후');
    });

    it('Patching return NotFound Error', () => {
      try {
        service.patchMovie(2, { title: '변경!!' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
