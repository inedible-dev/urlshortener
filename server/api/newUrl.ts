import prisma from "../../lib/prisma";
import { H3Event, sendError, createError } from 'h3'

export default async (event: H3Event) => {
    const body = await readBody(event)
    try {
        const url = await prisma.uRLS.create({
            data: {
                id: `${body.id}`,
                url: `${body.url}`
            }
        })
        return url
    } catch (err: any) {
        return 'failure'
    }
}
