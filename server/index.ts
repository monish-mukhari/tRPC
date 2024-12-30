import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const todoInputType = z.object({
    title: z.string(),
    description: z.string(),
});

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

const appRouter = router({
    createTodo: publicProcedure
        .input(todoInputType)
        .mutation(async (opts) => {
            const username = opts.ctx.username; 
            console.log(username);
            const title = opts.input.title;
            const description = opts.input.description;

            // Do db stuff here

            return {
                id: "1"
            }
        }),
    signUp: publicProcedure
        .input(signupSchema)
        .mutation(async (opts) => {
            const email = opts.input.email;
            const password = opts.input.password;

            // Do database stuff here

            const token = "123123";

            return {
                token
            }
        })
});

const server = createHTTPServer({
    router: appRouter,
    createContext(opts) { 
        const authHeader = opts.req.headers["authorization"];
        console.log(authHeader);
        return {
            username: "1234"
        }
    }
});

server.listen(3000);

export type AppRouter = typeof appRouter;