import prisma from "../../lib/prisma";
import { H3Event } from "h3";

export default async (event: H3Event) => {
    const body = await readBody(event)
    const urls = await prisma.uRLS.findMany({
        where: {
            id: `${body.id}`
        }
    })
    if (urls.length == 0) {
        return 'not found'
    } else {
        return urls[0]
    }
}