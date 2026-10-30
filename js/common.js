/* ===== 滴水湖房产中介网 - 共享组件（导航/页脚/占位图/浮窗） ===== */

/* ---------- SVG 占位图（湖景风格，无外部依赖） ---------- */
function svgImage(seed, label, sub) {
  label = label || "";
  sub = sub || "";
  const palettes = {
    blue: ["#0e5f8a", "#4aa8d8", "#cde9f6", "#0a2e4a"],
    teal: ["#0f7b7b", "#45b0a8", "#cdebdd", "#0a2e4a"],
    sand: ["#126fb3", "#7fb8d8", "#e8d8b8", "#0a2e4a"],
    sunset: ["#0a2e4a", "#126fb3", "#f0b95c", "#e8a33d"]
  };
  const p = palettes[["blue", "teal", "sand", "sunset"][Math.abs(seed) % 4]];
  const lakeY = 190 + (Math.abs(seed) * 7) % 60;
  const sunX = 50 + (Math.abs(seed) * 13) % 30;
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 530">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/>
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${p[1]}"/><stop offset="1" stop-color="${p[0]}"/>
        </linearGradient>
      </defs>
      <rect width="800" height="530" fill="url(#sky)"/>
      <circle cx="${sunX}" cy="120" r="46" fill="${p[3]}" opacity="0.85"/>
      <path d="M0 ${lakeY} Q200 ${lakeY - 28} 400 ${lakeY} T800 ${lakeY} V530 H0 Z" fill="url(#water)" opacity="0.9"/>
      <path d="M0 ${lakeY + 22} Q200 ${lakeY - 6} 400 ${lakeY + 22} T800 ${lakeY + 22} V530 H0 Z" fill="${p[2]}" opacity="0.5"/>
      <path d="M120 ${lakeY - 40} q26 -34 52 0 q26 -34 52 0 q26 -34 52 0" stroke="${p[2]}" stroke-width="3" fill="none" opacity="0.7"/>
      <path d="M560 ${lakeY - 52} q26 -34 52 0 q26 -34 52 0 q26 -34 52 0" stroke="${p[2]}" stroke-width="3" fill="none" opacity="0.7"/>
      <text x="400" y="310" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="30" font-weight="bold" fill="#ffffff" opacity="0.95">${label}</text>
      ${sub ? `<text x="400" y="350" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="17" fill="#ffffff" opacity="0.75">${sub}</text>` : ""}
    </svg>`)}`;
}

/* ---------- 导航栏 ---------- */
function renderNav(active) {
  const links = [
    ["index.html", "首页", "home"],
    ["listings.html", "在售房源", "listings"],
    ["stores.html", "门店与经纪人", "stores"],
    ["booking.html", "预约看房", "booking"],
    ["contact.html", "联系我们", "contact"]
  ];
  const html = links.map(([href, name, key]) =>
    `<a href="${href}" class="${key === active ? "active" : ""}">${name}</a>`).join("");
  document.getElementById("site-header").innerHTML = `
    <div class="container">
      <nav class="nav">
        <a class="brand" href="index.html">
          <span class="logo">🌊</span>
          <span>滴水湖房产 · 滴水湖.cn</span>
        </a>
        <button class="nav-toggle" id="navToggle" aria-label="菜单">☰</button>
        <div class="nav-links" id="navLinks">${html}</div>
        <a class="nav-cta" href="booking.html">免费咨询看房</a>
      </nav>
    </div>`;
  document.getElementById("navToggle").addEventListener("click", () =>
    document.getElementById("navLinks").classList.toggle("open"));
}

/* ---------- 页脚 ---------- */
function renderFooter() {
  document.getElementById("site-footer").innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="brand"><span class="logo">🌊</span><span>滴水湖房产</span></div>
          <p>深耕滴水湖周边 8 年，专注临港新片区住宅、湖景豪宅与滨海物业，1200+ 家庭信赖之选。</p>
        </div>
        <div>
          <h4>快速导航</h4>
          <ul>
            <li><a href="index.html">首页</a></li>
            <li><a href="listings.html">在售房源</a></li>
            <li><a href="stores.html">门店与经纪人</a></li>
            <li><a href="booking.html">预约看房</a></li>
          </ul>
        </div>
        <div>
          <h4>热门板块</h4>
          <ul>
            <li><a href="listings.html?district=滴水湖">滴水湖商圈</a></li>
            <li><a href="listings.html?district=临港主城区">临港主城区</a></li>
            <li><a href="listings.html?district=芦潮港">芦潮港生活区</a></li>
            <li><a href="listings.html?district=南汇嘴">南汇嘴滨海区</a></li>
          </ul>
        </div>
        <div>
          <h4>联系我们</h4>
          <ul>
            <li>📞 021-5896-1888（滴水湖旗舰店）</li>
            <li>📱 138-1818-0001（陈店长）</li>
            <li>📍 南汇新城镇滴水湖环湖西一路 88 号</li>
            <li>🕐 全年无休 8:30 - 20:00</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">© 2026 滴水湖房产 · 滴水湖.cn ｜ 上海临港新片区专业房产中介 · 本页房源信息仅供参考</div>
    </div>`;
}

/* ---------- 在线咨询浮窗 ---------- */
function renderConsultWidget() {
  const widget = document.createElement("div");
  widget.id = "consult-widget";
  widget.innerHTML = `
    <div class="cw-panel" id="cwPanel">
      <div class="cw-head">
        <div><div class="cw-title">在线咨询 · 滴水湖房产</div>
        <div class="cw-sub">认证经纪人在线，通常 1 分钟内回复</div></div>
        <button class="cw-close" id="cwClose" aria-label="关闭">✕</button>
      </div>
      <div class="cw-body" id="cwBody">
        <div class="cw-msg cw-agent"><b>陈店长</b>：您好！我是滴水湖房产陈湖生，有什么可以帮您？可为您推荐房源、解答限购限贷政策。</div>
      </div>
      <div class="cw-quick">
        <button data-q="推荐滴水湖在售房源">推荐房源</button>
        <button data-q="限购限贷政策怎么算？">政策咨询</button>
        <button data-q="预约周末看房">预约看房</button>
      </div>
      <form class="cw-form" id="cwForm">
        <input type="text" id="cwInput" placeholder="输入您的问题…" autocomplete="off">
        <button type="submit">发送</button>
      </form>
      <div class="cw-foot">📞 021-5896-1888 ｜ <a href="booking.html">预约看房</a></div>
    </div>
    <button class="cw-fab" id="cwFab" aria-label="在线咨询">💬<span>在线咨询</span></button>`;
  document.body.appendChild(widget);

  const panel = widget.querySelector("#cwPanel");
  const body = widget.querySelector("#cwBody");
  const input = widget.querySelector("#cwInput");
  widget.querySelector("#cwFab").addEventListener("click", () => panel.classList.add("open"));
  widget.querySelector("#cwClose").addEventListener("click", () => panel.classList.remove("open"));
  widget.querySelectorAll(".cw-quick button").forEach(btn => btn.addEventListener("click", () => {
    input.value = btn.dataset.q; submit();
  }));
  widget.querySelector("#cwForm").addEventListener("submit", e => { e.preventDefault(); submit(); });

  function addMsg(cls, text) {
    const div = document.createElement("div");
    div.className = "cw-msg " + cls;
    div.innerHTML = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }
  function submit() {
    const q = input.value.trim();
    if (!q) return;
    addMsg("cw-user", "我：" + escapeHtml(q));
    input.value = "";
    setTimeout(() => {
      let reply = "收到！稍后为您安排专属经纪人跟进，也可以直接拨打 021-5896-1888 或填写预约看房表单，我们会尽快与您联系。";
      if (q.indexOf("预约") >= 0) reply = "好的！已为您登记看房意向，请填写<a href='booking.html'>预约看房表单</a>，经纪人会在 30 分钟内与您确认时间。";
      if (q.indexOf("政策") >= 0 || q.indexOf("限购") >= 0) reply = "临港新片区执行上海购房政策，具体首付比例与资格认定欢迎致电 021-5896-1888，我为您一对一测算。";
      addMsg("cw-agent", "<b>经纪人</b>：" + reply);
    }, 800);
  }
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------- 页头注入 ---------- */
function injectHead() {
  const head = document.createElement("link");
  head.rel = "stylesheet";
  head.href = "css/style.css";
  document.head.appendChild(head);
  const foot = document.createElement("script");
  foot.src = "js/data.js";
  document.head.appendChild(foot);
}

/* ---------- 通用初始化 ---------- */
function initPage(active) {
  injectHead();
  renderNav(active);
  renderFooter();
  renderConsultWidget();
}
