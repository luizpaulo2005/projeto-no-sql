import z from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    SERVER_PORT: z.coerce.number().default(3333),
    SERVER_URL: z.string().url().default('http://localhost'),
})

const env = envSchema.parse(process.env)

export { env }