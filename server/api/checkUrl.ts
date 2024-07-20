import prisma from "../../lib/prisma";
import { H3Event } from "h3";

export default eventHandler(async (event: H3Event) => {
    const body = await readBody(event)
    const urls = await prisma.uRLS.findMany({
        where: {
            id: `${body.id}`
        }
    })
    if (urls.length == 0) {
        return 'not found'
    } else {
        // update visit
        await prisma.uRLS.update({
            data: {
                visits: urls[0].visits + 1
            },
            where: {
                id: `${body.id}`
            }
        })
        return urls[0]
    }
})