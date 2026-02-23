export async function getCurrentUserId(): Promise<string> {
  // For now: demo user
  return "demo-user";

  // Later:
  // const session = await getServerSession(authOptions)
  // if (!session?.user?.id) throw new Error("Unauthorized")
  // return session.user.id
}