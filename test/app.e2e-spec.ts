import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'sad', year: 2023, genres: ['sad'] })
        .expect(201);
    });

    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .send('1')
        .expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'asd', year: 2023, genres: ['!23'] })
        .expect(201);
    });
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999999').expect(404);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: '응가' })
        .expect(200);
    });
    it('PATCH 404', () => {
      return request(app.getHttpServer())
        .patch('/movies/99999999')
        .send({ title: '응가' })
        .expect(404);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
    it('DELETE 404', () => {
      return request(app.getHttpServer()).delete('/movies/9999999').expect(404);
    });
  });
});
