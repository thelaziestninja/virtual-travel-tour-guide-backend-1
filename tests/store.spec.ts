import request from 'supertest'

import app from '../src/app'

describe('Store Route API tests', () => {
  it('should complete the example requests in file', async function () {
    const req = request(app)

    // 1. Set "name" to "John"
    await req.post('/store').send({
      key: 'name',
      value: 'John'
    })

    // 2. Get "name" -> This returns John
    const johnResponse = await req.get('/store/name').set('Accept', 'application/json')
    expect(johnResponse.text).toEqual('John')
    expect(johnResponse.status).toEqual(200)

    // 3. Get "age" -> This returns an empty value
    const ageResponse = await req.get('/store/age').set('Accept', 'application/json')
    expect(ageResponse.text).toEqual('')
    expect(ageResponse.status).toEqual(200)

    // 4. Set "name" to "Larry" with a TTL of 30 seconds
    // (in this case reduced to 5 seconds for testing purposes)
    await req.post('/store').send({
      key: 'name',
      value: 'Larry',
      ttl: 5
    })

    // 5. Get "name" (within 5 seconds of the set) -> This returns "Larry"
    const larryResponse = await req.get('/store/name').set('Accept', 'application/json')
    expect(larryResponse.text).toEqual('Larry')
    expect(larryResponse.status).toEqual(200)

    // 6. Get "name" (more than 5 seconds after the set) -> This returns an empty value
    await new Promise(resolve => setTimeout(resolve, 7000)) // wait 7 sec

    const emptyNameResponse = await req.get('/store/name').set('Accept', 'application/json')
    expect(emptyNameResponse.text).toEqual('')
    expect(emptyNameResponse.status).toEqual(200)
  }, 10000) // 10 secs max time for the test

  it('should be able to delete key', async function () {
    const req = request(app)

    await req.post('/store').send({
      key: 'deleteKey',
      value: 'John'
    })

    const johnResponse = await req.get('/store/deleteKey').set('Accept', 'application/json')
    expect(johnResponse.text).toEqual('John')
    expect(johnResponse.status).toEqual(200)

    const deleteResponse = await req.delete('/store/deleteKey')
    expect(deleteResponse.status).toEqual(200)

    const emptyResponse = await req.get('/store/deleteKey').set('Accept', 'application/json')
    expect(emptyResponse.text).toEqual('')
    expect(emptyResponse.status).toEqual(200)
  })
})
