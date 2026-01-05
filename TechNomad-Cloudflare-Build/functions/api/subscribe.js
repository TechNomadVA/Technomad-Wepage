// Cloudflare Worker API endpoint for email subscriptions
export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    // Parse request body
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Valid email is required' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if email already exists
    const existing = await env.DB.prepare(
      'SELECT id FROM subscribers WHERE email = ?'
    ).bind(email).first();

    if (existing) {
      return new Response(
        JSON.stringify({ message: 'Email already subscribed', alreadyExists: true }),
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Insert new subscriber
    const result = await env.DB.prepare(
      'INSERT INTO subscribers (email, subscribed_at, source) VALUES (?, ?, ?)'
    )
      .bind(email, new Date().toISOString(), 'website')
      .run();

    return new Response(
      JSON.stringify({ 
        message: 'Successfully subscribed!',
        id: result.meta.last_row_id 
      }),
      { 
        status: 201,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process subscription' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}



