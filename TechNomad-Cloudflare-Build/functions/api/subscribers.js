// Cloudflare Worker API endpoint to get all subscribers (for admin/market research)
export async function onRequestGet(context) {
  const { request, env } = context;
  
  try {
    // Get query parameters for pagination
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const offset = (page - 1) * limit;

    // Get total count
    const countResult = await env.DB.prepare('SELECT COUNT(*) as total FROM subscribers').first();
    const total = countResult?.total || 0;

    // Get subscribers
    const subscribers = await env.DB.prepare(
      'SELECT id, email, subscribed_at, source FROM subscribers ORDER BY subscribed_at DESC LIMIT ? OFFSET ?'
    )
      .bind(limit, offset)
      .all();

    return new Response(
      JSON.stringify({
        subscribers: subscribers.results || [],
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }),
      { 
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    console.error('Fetch subscribers error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch subscribers' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}



