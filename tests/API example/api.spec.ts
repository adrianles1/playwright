import { test, expect } from '@playwright/test'

test.describe('JSON Placeholder', () =>{
test("GET - retrieve all posts", async ({request}) =>{
  let baseUrl = 'https://jsonplaceholder.typicode.com/posts'
    const response = await request.get(baseUrl);

  
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.length).toBeGreaterThan(0);

    expect(Array.isArray(body)).toBe(true);

          const headers = response.headers();
      expect(headers['content-type']).toContain('application/json');
})

test("GET - retrieve a single post", async ({request}) =>{
  let baseUrl = 'https://jsonplaceholder.typicode.com/posts/1'
    const response = await request.get(baseUrl);

    //Status
    expect(response.status()).toBe(200);

    const body = await response.json();

    //Properties
    
    expect(body).toHaveProperty('userId');
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');
      // expect(body[0].id).toBe(1);

      //Header validations
      const headers = response.headers();
      console.log(response)
      expect(headers['content-type']).toContain('application/json');
})

test("POST", async({request}) => {
  let endpoint = 'https://jsonplaceholder.typicode.com/posts'
  const newBody = {
    "userId": 1,
    "title": 'My New POST',
    "body": 'hello'
  }
 const response = await request.post(endpoint, {data: newBody});
 const body = await response.json();
 console.log(body);

 expect(response.status()).toBe(201)

 //expect(body).toMatchObject(newBody);
expect(body.userId).toBe(newBody.userId)
expect(body.title).toBe(newBody.title)
expect(body.body).toBe(newBody.body)
expect(body).toHaveProperty("id")
})

test("PUT", async({request}) => {
  let endpoint = 'https://jsonplaceholder.typicode.com/posts/1'
  const newBody = {
    "userId": 1,
    "title": 'My New PUT',
    "body": 'hello put'
  }
 const response = await request.put(endpoint, {data: newBody});
 const body = await response.json();
 console.log(body);

 expect(response.status()).toBe(200)
 expect(body).toMatchObject(newBody);
})

test("PATCH", async({request}) => {
  let endpoint = 'https://jsonplaceholder.typicode.com/posts/1'
  const newBody = {
    "title": 'My New PUT',
  }
 const response = await request.patch(endpoint, {data: newBody});
 const body = await response.json();
 console.log(body);

 expect(response.status()).toBe(200)
 expect(body.title).toBe(newBody.title);
})

test('DELETE', async({request}) => {
  const endpoint = 'https://jsonplaceholder.typicode.com/posts/1'
  const response = await request.delete(endpoint);
  expect(response.status()).toBe(200);
})
})