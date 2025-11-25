import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { decode, jwt, sign, verify } from 'hono/jwt'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Userrouter } from './routes/user';
import { Blogrouter } from './routes/blog';
import { cors } from 'hono/cors';
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string
	}
}>();
app.use('/*',cors())
app.route("/api/v1/user",Userrouter);
app.route("/api/v1/blog",Blogrouter);
app.get('/', (c) => {
  return c.text('Hello Hono!')
})




export default app
