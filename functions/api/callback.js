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

    if (!token) throw new Error('GitHub 未返回 token，错误详情: ' + JSON.stringify(data));

    // 增加了可视化界面和强行关闭的兜底机制
    const script = `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head><meta charset="UTF-8"><title>授权成功</title></head>
      <body style="display:flex; justify-content:center; align-items:center; height:100vh; font-family:sans-serif; background-color:#f8f9fa;">
        <div style="text-align:center;">
          <h2 style="color:#28a745;">✅ 授权成功！</h2>
          <p style="color:#6c757d;">正在返回后台系统，请稍候...</p>
        </div>
        <script>
          const receiveMessage = (message) => {
            if (message.data === "authorizing:github") {
              window.opener.postMessage(
                'authorization:github:success:{"token":"${token}","provider":"github"}',
                message.origin
              );
              window.removeEventListener("message", receiveMessage, false);
              // 发送成功后，1秒后自动关闭自己
              setTimeout(() => window.close(), 1000);
            }
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
          
          // 兜底机制：如果 3 秒后弹窗还没关，提示用户手动操作
          setTimeout(() => {
            document.body.innerHTML = '<div style="text-align:center;"><h2 style="color:#28a745;">✅ 授权已完成</h2><p style="color:#6c757d;">如果窗口没有自动关闭，请直接<b>手动关闭这个页面</b>，回到原网页刷新即可进入后台。</p></div>';
          }, 3000);
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
