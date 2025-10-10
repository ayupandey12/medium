import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { decode, jwt, sign, verify } from 'hono/jwt'
import { withAccelerate } from '@prisma/extension-accelerate'
import { string } from 'zod';
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string
	}
}>();
app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.post('/api/v1/user/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	try {
    console.log(c.env.DATABASE_URL)
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
		const token = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ token });
	} catch (e) {
  console.log('Error:', JSON.stringify(e))
  c.status(403)
  return c.json({ error: 'Error while signing up' })
}
})
app.post('/api/v1/user/signin',(c)=>{
    return c.text('signin')
})
app.post('/api/v1/blog',(c)=>{
  return c.text('post blog')
})
app.put('/api/v1/blog',(c)=>{
  return c.text('update blog')
})
app.get('/api/v1/blog/:id',(c)=>{
  return c.text('check blog with id ')
})
app.get('/api/v1/blog/bulk',(c)=>{
  return c.text('check all blogs')
})

export default app
//'postgresql://neondb_owner:npg_x83UenPSfKIm@ep-little-haze-adt8vnyi-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19yMXlRMWtkTFliNHV1YmlYekZLY04iLCJhcGlfa2V5IjoiMDFLNzZZQVRURFM2U0JGUlY4Q1FHR1Y1R0ciLCJ0ZW5hbnRfaWQiOiI5NjkxNDkxMzFhM2I4YzYzM2Q2MzQzMzU0ZTE2OTFkNTcyYzA0ZTkzYjFhZmIxNmRhZGUwZjE3MTI4N2MzODQzIiwiaW50ZXJuYWxfc2VjcmV0IjoiZDdjMTU1MGMtYzEzYS00ZGRmLTlmMmUtZjNlZmZhZjU3MjJhIn0.DRll-Be2L_Mr9upx7WRr10R9cYKQE5w3PGpbDpqcCgg"