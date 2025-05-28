// Imports de hono
//import {serve} from '@hono/node-server';
import { handle } from 'hono/vercel'
import {cors} from 'hono/cors';
import {auth} from './lib/auth';
import {Hono} from 'hono';

// Rutas
import {calendar} from './routes/calendar';
import {documents} from './routes/documents';
import {suggestions} from './routes/suggestions';

const app = new Hono();

// Better Auth
app.use(
  '/api/auth/*',
  cors({
    origin: ['http://localhost:5174', 'https://alex-vallejo.vercel.app'],
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

app.options('/api/auth/*', c => c.status(204));

app.on(['GET', 'POST'], '/api/auth/*', c => {
  return auth.handler(c.req.raw);
});

/*Upload thing
 */

app.get('/', c => c.text('Bienvenido a la api!!'));
app.route('/calendar', calendar);
app.route('/documents', documents);
app.route('/suggestions', suggestions);

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
