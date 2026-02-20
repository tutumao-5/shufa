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

    if (!token) throw new Error('未能获取 Token');

    // 引入 CMS 同款数据库操作库，强行写入缓存并在此页面直接进入后台
    const script = `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <title>正在进入后台...</title>
        <script src="https://unpkg.com/localforage@1.10.0/dist/localforage.min.js"></script>
      </head>
      <body style="display:flex; justify-content:center; align-items:center; height:100vh; font-family:sans-serif; background:#f4f6f8; margin:0;">
        <div style="text-align:center; background:white; padding:40px; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          <h2 style="color:#28a745; margin-top:0;">✅ 授权成功</h2>
          <p style="color:#666;">正在为您直接打开内部数据页面...</p>
        </div>
        <script>
          // 1. 尝试通知原窗口（防丢失兜底机制）
          if (window.opener) {
            window.opener.postMessage('authorization:github:success:{"token":"${token}","provider":"github"}', '*');
          }

          // 2. 核心大招：直接把钥匙写入 CMS 依赖的底层数据库
          const userData = { token: "${token}", backend_type: "github" };
          
          localforage.setItem("decap-cms-user", userData).then(() => {
            return localforage.setItem("netlify-cms-user", userData);
          }).then(() => {
            // 3. 强行把当前这个授权网页，直接重定向到你的后台管理界面
            setTimeout(() => {
              window.location.replace("/admin/index.html");
            }, 800);
          }).catch((err) => {
            document.body.innerHTML = "<p style='color:red;'>写入数据库失败，请刷新重试: " + err.message + "</p>";
          });
        </script>
      </body>
      </html>
    `;
    return new Response(script, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' },
    });
  } catch (error) {
    return new Response("服务器错误：" + error.message, { status: 500 });
  }
}
