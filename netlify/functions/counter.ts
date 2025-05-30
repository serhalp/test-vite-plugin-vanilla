import { getStore } from '@netlify/blobs';

const store = getStore('counter-store');
const COUNTER_KEY = 'counter';

export default async function (request: Request) {
  if (request.method === 'GET') {
    // Get the current counter value
    const value = await store.get(COUNTER_KEY, { type: 'json' });
    return Response.json({ count: value ?? 0 });
  }

  if (request.method === 'POST') {
    // Increment the counter
    let value = await store.get(COUNTER_KEY, { type: 'json' });
    if (typeof value !== 'number') value = 0;
    value++;
    await store.setJSON(COUNTER_KEY, value);
    return Response.json({ count: value });
  }

  return new Response('Method Not Allowed', { status: 405 });
} 