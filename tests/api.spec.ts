import { test, expect } from '@playwright/test'

test("API test example", async ({request}) =>{
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body);

      expect(body.id).toBe(1);
      expect(body.body).toContain('quiayy')
  expect(body.title).toBeTruthy();
})