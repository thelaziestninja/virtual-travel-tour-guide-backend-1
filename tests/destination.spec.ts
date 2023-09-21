import request from 'supertest'

import app from '../src/app'

describe('Destination Route API tests', () => {
  it('should complete the example requests in file', async function () {
    const req = request(app)

    // 1. Add "Hello" to destination
    await req.post('/destination').send({ item: 'Hello' })

    // 2. Add "World" to destination
    await req.post('/destination').send({ item: 'World' })

    //3. Get item from destination -> "World" would be returned
    const worldResponse = await req.get('/destination').set('Accept', 'application/json')

    expect(worldResponse.text).toEqual('World')
    expect(worldResponse.status).toEqual(200)

    // 4. Add "Again" to destination
    await req.post('/destination').send({ item: 'Again' })

    //5. Get item from destination -> "Again" would be returned
    const againResponse = await req.get('/destination').set('Accept', 'application/json')

    expect(againResponse.text).toEqual('Again')
    expect(againResponse.status).toEqual(200)

    //6. Get item from destination -> "Hello" would be returned
    const helloResponse = await req.get('/destination').set('Accept', 'application/json')

    expect(helloResponse.text).toEqual('Hello')
    expect(helloResponse.status).toEqual(200)
  })
  it('should return the reverse order of the sent names', async function () {
    const req = request(app)

    const names = ['john', 'francis', 'peter']

    for (const name of names) {
      await req
        .post('/destination')
        .send({ item: name })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
    }

    for (const name of names.reverse()) {
      const response = await req.get('/destination').set('Accept', 'application/json')

      expect(response.text).toEqual(name)
      expect(response.status).toEqual(200)
    }
  })

  it('should return 200 with empty string when destination is empty', done => {
    request(app)
      .get('/destination')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.text).toBe('')
        done()
      })
  })
})
