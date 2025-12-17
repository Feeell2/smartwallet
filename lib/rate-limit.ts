// Simple in-memory rate limiter for development
// For production, use Redis-based rate limiting (Upstash or Vercel KV)

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

class InMemoryRateLimiter {
  private store = new Map<string, RateLimitRecord>();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Clean up expired entries every 5 minutes
    if (typeof window === 'undefined') {
      this.cleanupInterval = setInterval(() => {
        const now = Date.now();
        for (const [key, record] of this.store.entries()) {
          if (record.resetAt < now) {
            this.store.delete(key);
          }
        }
      }, 5 * 60 * 1000);
    }
  }

  async limit(identifier: string, options: { requests: number; window: number }): Promise<{ success: boolean; remaining: number; reset: number }> {
    const now = Date.now();
    const key = identifier;
    const record = this.store.get(key);

    if (!record || record.resetAt < now) {
      // Create new record
      const resetAt = now + options.window;
      this.store.set(key, { count: 1, resetAt });
      return {
        success: true,
        remaining: options.requests - 1,
        reset: resetAt,
      };
    }

    if (record.count >= options.requests) {
      // Rate limit exceeded
      return {
        success: false,
        remaining: 0,
        reset: record.resetAt,
      };
    }

    // Increment count
    record.count += 1;
    this.store.set(key, record);

    return {
      success: true,
      remaining: options.requests - record.count,
      reset: record.resetAt,
    };
  }

  cleanup() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

// Singleton instance
const rateLimiter = new InMemoryRateLimiter();

export async function rateLimit(
  identifier: string,
  options: { requests: number; window: number } = { requests: 5, window: 15 * 60 * 1000 }
): Promise<{ success: boolean; remaining: number; reset: number }> {
  if (process.env.NODE_ENV === 'production') {
    console.warn(
      '⚠️  Using in-memory rate limiting in production. Consider using Redis-based rate limiting (Upstash or Vercel KV) for production environments.'
    );
  }

  return rateLimiter.limit(identifier, options);
}
