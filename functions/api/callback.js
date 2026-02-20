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

    if (!token) throw new Error('未能获取 Token，错误详情：' + JSON.stringify(data));

    // 加入可视化按钮，通过物理点击绕过浏览器的脚本拦截策略
    const script = `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <title>授权验证</title>
        <style>
          body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f4f6f8; margin: 0; }
          .card { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; }
          button { background: #28a745; color: white; border: none; padding: 12px 24px; font-size: 16px; border-radius: 4px; cursor: pointer; margin-top: 20px; font-weight: bold; }
          button:hover { background: #218838; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2 style="color: #333; margin-top:0;">✅ 钥匙已获取</h2>
          <p style="color: #666;">系统已成功与 GitHub 对接。</p>
          <button id="enterBtn">点击进入管理后台</button>
          <p id="log" style="color: red; font-size: 13px; margin-top: 15px;"></p>
        </div>
        <script>
          document.getElementById('enterBtn').addEventListener('click', () => {
            try {
              if (window.opener) {
                // 1. 先发送唤醒信号
                window.opener.postMessage("authorizing:github", "*");
                // 2. 延迟0.1秒后发送真实的密钥，确保主网页已准备好接收
                setTimeout(() => {
                  const msg = 'authorization:github:success:{"token":"${token}","provider":"github"}';
                  window.opener.postMessage(msg, '*');
                  window.close();
                }, 100);
              } else {
                document.getElementById('log').innerText = "对接失败：主网页丢失。请不要使用无痕模式，直接在常规窗口重试。";
              }
            } catch(e) {
              document.getElementById('log').innerText = "发生错误: " + e.message;
            }
          });
        </script>
      </body>
      </html>
    `;
    return new Response(script, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' },
    });
  } catch (error) {
    return new Response("服务器错误：" + error.message, { status: 500, headers: { 'Content-Type': 'text/plain;charset=UTF-8' } });
  }
}
