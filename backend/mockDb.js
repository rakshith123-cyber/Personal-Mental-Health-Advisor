// Simple in-memory mock database for testing without MongoDB
class MockDatabase {
  constructor() {
    this.users = new Map();
    this.chatSessions = new Map();
    this.idCounter = 1000;
  }

  generateId() {
    return `${this.idCounter++}`;
  }

  // User operations
  async findUserByEmail(email) {
    for (const user of this.users.values()) {
      if (user.email === email) return { ...user };
    }
    return null;
  }

  async findUserById(id) {
    const user = this.users.get(id);
    return user ? { ...user } : null;
  }

  async createUser(userData) {
    const id = this.generateId();
    const user = {
      _id: id,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, user);
    return { ...user };
  }

  async updateUser(id, updates) {
    const user = this.users.get(id);
    if (!user) return null;
    const updated = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updated);
    return { ...updated };
  }

  // Chat session operations
  async findChatSession(sessionId, userId) {
    const sessions = Array.from(this.chatSessions.values()).filter(
      (s) => s.sessionId === sessionId && s.userId === userId
    );
    return sessions.length > 0 ? { ...sessions[0] } : null;
  }

  async createOrUpdateChatSession(sessionId, userId, sessionData) {
    const key = `${userId}-${sessionId}`;
    const session = {
      _id: this.generateId(),
      userId,
      sessionId,
      title: sessionData.title || 'New Chat',
      messages: sessionData.messages || [],
      mood: sessionData.mood || 'neutral',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.chatSessions.set(key, session);
    return { ...session };
  }

  async getChatSessions(userId) {
    return Array.from(this.chatSessions.values())
      .filter((s) => s.userId === userId)
      .map((s) => ({ ...s }))
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  async deleteChatSession(sessionId, userId) {
    const key = `${userId}-${sessionId}`;
    const session = this.chatSessions.get(key);
    this.chatSessions.delete(key);
    return session ? { ...session } : null;
  }

  async addMessageToSession(sessionId, userId, message) {
    const key = `${userId}-${sessionId}`;
    const session = this.chatSessions.get(key);
    if (!session) return null;
    session.messages.push({
      role: message.role,
      content: message.content,
      timestamp: new Date(),
    });
    session.updatedAt = new Date();
    return { ...session };
  }
}

// Singleton instance
const mockDb = new MockDatabase();

module.exports = mockDb;
