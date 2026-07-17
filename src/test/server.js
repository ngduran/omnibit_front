import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// Define o comportamento da rota de login
const handlers = [
  http.post('**/auth/login', () => {
    return new HttpResponse(null, { status: 401 });
  }),
];

export const server = setupServer(...handlers);