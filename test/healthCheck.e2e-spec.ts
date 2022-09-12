import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'

import { AppModule } from './../src/app.module'

describe('HealthCheck Test (E2E)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.healthy).toBeDefined()
        expect(res.body.version).toBeDefined()
        expect(res.body.name).toBeDefined()
      })
      .end(done)
  })
})
