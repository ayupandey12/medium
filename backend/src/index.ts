import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { decode, jwt, sign, verify } from 'hono/jwt'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Userrouter } from './routes/user';
import { Blogrouter } from './routes/blog';
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string
	}
}>();
app.route("/api/v1/user",Userrouter);
app.route("/api/v1/blog",Blogrouter);
app.get('/', (c) => {
  return c.text('Hello Hono!')
})




export default app
//'postgresql://neondb_owner:npg_x83UenPSfKIm@ep-little-haze-adt8vnyi-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19yMXlRMWtkTFliNHV1YmlYekZLY04iLCJhcGlfa2V5IjoiMDFLNzZZQVRURFM2U0JGUlY4Q1FHR1Y1R0ciLCJ0ZW5hbnRfaWQiOiI5NjkxNDkxMzFhM2I4YzYzM2Q2MzQzMzU0ZTE2OTFkNTcyYzA0ZTkzYjFhZmIxNmRhZGUwZjE3MTI4N2MzODQzIiwiaW50ZXJuYWxfc2VjcmV0IjoiZDdjMTU1MGMtYzEzYS00ZGRmLTlmMmUtZjNlZmZhZjU3MjJhIn0.DRll-Be2L_Mr9upx7WRr10R9cYKQE5w3PGpbDpqcCgg"