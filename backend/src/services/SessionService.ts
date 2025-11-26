import { prisma } from "@/config/db";

class SessionService {
  public async getSessionId(contentId: string) {
    try {
      const session = await prisma.session.upsert({
        where: { content_id: contentId },
        create: { content_id: contentId },
        update: {},
      });

      return session.pid;
    } catch (err) {
      console.error("Error fetching/creating session: ", err);
      throw err;
    }
  }
}

export default new SessionService();
