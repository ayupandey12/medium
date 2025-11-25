import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { decode, jwt, sign, verify } from 'hono/jwt'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Signinschema,Signupschema } from 'ayushdevinfermedium1-common'
export const Userrouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
       JWT_SECRET:string
    }
}>();
Userrouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	const body = await c.req.json();
    const decode =Signupschema.safeParse(body)
    if(!decode.success)
    {
        c.status(403);
      return c.json({message:"invalid schema"});
    }
	try {
		const user = await prisma.user.create({
			data: { name:body.name??null,
				email: body.email,
				password: body.password
			}
		});
		const token = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ token });
	} catch (e) {
		console.log(e);
  c.status(403)
  return c.json({ error: 'Error while signing up' })
}
})
Userrouter.post('/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    	const body = await c.req.json();
        const decode =Signinschema.safeParse(body)
    if(!decode.success)
    {
        c.status(403);
      return c.json({message:"invalid schema"});
    }
	try {
	const user = await prisma.user.findUnique({
		where: {
			email: body.email,
			password:body.password
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

	const token = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({ token });
	} catch (error) {
		c.status(411);
		c.json({error:"invalid"});
	}
})
