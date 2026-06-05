// tests/auth.test.js
import request from 'supertest'
import app from '../../server.js'

// Test 1 — login with no credentials
test('login should fail with no credentials', async () => {
  const res = await request(app)
    .post('/auth/login')
    .send({})

  expect(res.status).toBe(400)
})

// Test 2 — protected route without token
test('should block unauthenticated access', async () => {
  const res = await request(app)
    .get('/chats')

  expect(res.status).toBe(401)
})