export async function onRequest(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');
  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        client_id: context.env.GITHUB_CLIENT_ID,
        client_secret: context.env.GITHUB_CLIENT_SECRET,
        code
      }),
    });
    const data = await response.json();
    const token = data.access_token;
    if (!token) throw new Error('No token');

    const script = `
    <script>
      const receiveMessage = (message) => {
        if (message.data === "authorizing:github") {
          window.opener.postMessage(
            'authorization:github:success:{"token":"${token}","provider":"github"}',
            message.origin
          );
          window.removeEventListener("message", receiveMessage, false);
        }
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    </script>
    `;
    return new Response(script, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
