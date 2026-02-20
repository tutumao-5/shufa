export async function onRequest(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');
  const client_id = context.env.GITHUB_CLIENT_ID;
  const client_secret = context.env.GITHUB_CLIENT_SECRET;

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ client_id, client_secret, code }),
    });

    const data = await response.json();
    const token = data.access_token;

    if (!token) throw new Error('获取 Token 失败');

    // 直接向主窗口发送带有 Token 的成功消息，随后立刻关闭自己
    const script = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"><title>正在返回后台...</title></head>
      <body>
        <script>
          const tokenMsg = 'authorization:github:success:{"token":"${token}","provider":"github"}';
          if (window.opener) {
            window.opener.postMessage(tokenMsg, '*');
            setTimeout(() => window.close(), 500);
          } else {
            document.write("对接失败：找不到主窗口。");
          }
        </script>
      </body>
      </html>
    `;
    return new Response(script, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' },
    });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
