# -*- coding: utf-8 -*-
"""把新闻中心卡片预渲染为静态 HTML（无 JS 也可见，SEO 友好）"""
import os

BASE = r"D:\.workbuddy\2026-10-30-19-29-21\dishuihu"

NEWS = [
    (1, "dishuihu-fangwu-gonglue", "2026年滴水湖买房攻略：临港新片区置业全流程指南", "置业攻略", "2026-10-28", "预算、资格、选房、贷款、过户全流程拆解，首次置业临港必看。"),
    (2, "lingang-gouxian-zhengce", "临港新片区限购政策详解：外地人能在滴水湖买房吗？", "政策解读", "2026-10-25", "社保年限、人才引进、首套二套认定，一文看懂临港购房资格。"),
    (3, "dishuihu-ershoufang-liucheng", "滴水湖二手房交易流程：从看房到过户的完整指南", "交易指南", "2026-10-22", "签约、网签、资金监管、贷款、过户每一步要点与避坑提示。"),
    (4, "dishuihu-fangjia-zoushi", "临港新片区房价走势分析：滴水湖板块还有升值空间吗？", "市场分析", "2026-10-20", "从交通、产业、人口三维度分析滴水湖房价走势与置业窗口期。"),
    (5, "dishuihu-zufang-gonglue", "滴水湖租房指南：地铁16号线沿线高性价比租房攻略", "租房指南", "2026-10-15", "滴水湖、临港大道、芦潮港各板块租金对比与租房防骗技巧。"),
    (6, "shanghai-zhongxue-dongxiao-xuequfang", "上海中学东校周边学区房：临港教育配套全解析", "学区房", "2026-10-12", "临港新片区学校清单、学区划分规则与学区房选购建议。"),
    (7, "dishuihu-gaijin-zhiyuan", "滴水湖改善置业指南：三房四房怎么选？", "置业攻略", "2026-10-08", "户型、楼层、朝向、小区对比，改善置换的六个决策要点。"),
    (8, "nanhuizer-haijingfang", "南汇嘴海景房值得买吗？滨海置业优缺点全分析", "市场分析", "2026-10-05", "景观、配套、流动性与持有成本，海景房投资前必读。"),
]

CATS = ["全部", "置业攻略", "政策解读", "交易指南", "市场分析", "租房指南", "学区房"]

cards = ""
for nid, slug, title, cat, date, desc in NEWS:
    cards += f'''      <a class="news-card" href="articles/{slug}.html" data-cat="{cat}">
        <div class="news-thumb"><img src="" data-img="news-{nid}" alt="{title}" loading="lazy"></div>
        <span class="news-cat">{cat}</span>
        <div class="news-body">
          <h3>{title}</h3>
          <p>{desc}</p>
          <div class="news-meta"><span>📅 {date}</span><span>💬 点击阅读全文</span></div>
        </div>
      </a>'''

filter_btns = "".join(
    f'<button data-c="{c}" class="{i == 0 and "on" or ""}">{c}</button>' for i, c in enumerate(CATS))

SCRIPT = '''<script src="js/common.js"></script>
<script>
initPage("news");

/* 图片占位图 */
document.querySelectorAll('[data-img]').forEach(img => {
  img.src = svgImage(img.dataset.img, "资讯", "");
});

/* 分类筛选（静态卡片，无 JS 时全部可见） */
var filter = document.getElementById("newsFilter");
filter.addEventListener("click", function(e) {
  var btn = e.target.closest("button");
  if (!btn) return;
  filter.querySelectorAll("button").forEach(function(b) { b.classList.remove("on"); });
  btn.classList.add("on");
  var cat = btn.dataset.c;
  document.querySelectorAll("#newsGrid .news-card").forEach(function(card) {
    card.style.display = (cat === "全部" || card.dataset.cat === cat) ? "" : "none";
  });
});
</script>
</body>
</html>
'''

html = (
    '<!DOCTYPE html>\n'
    '<html lang="zh-CN">\n'
    '<head>\n'
    '<meta charset="UTF-8">\n'
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
    '<title>新闻中心 | 滴水湖房产网 - 临港新片区房产资讯、政策解读、置业攻略</title>\n'
    '<meta name="description" content="滴水湖房产新闻中心：临港新片区限购政策解读、滴水湖房价走势分析、二手房交易流程攻略、租房指南、学区房解析、海景房置业分析，专业房产资讯助您安心置业。">\n'
    '<meta name="keywords" content="滴水湖新闻,临港新片区政策,临港限购,滴水湖房价,二手房交易流程,滴水湖租房,学区房,海景房">\n'
    '<script type="application/ld+json">\n'
    '{\n'
    '  "@context": "https://schema.org",\n'
    '  "@type": "NewsAPISectionPage",\n'
    '  "name": "滴水湖房产新闻中心",\n'
    '  "description": "临港新片区房产资讯、政策解读与置业攻略",\n'
    '  "url": "https://xn--1rwm9brn.cn/news.html",\n'
    '  "publisher": {"@type": "Organization", "name": "滴水湖房产", "url": "https://xn--1rwm9brn.cn/"}\n'
    '}\n'
    '</script>\n'
    '</head>\n'
    '<body>\n'
    '<header id="site-header"></header>\n'
    '\n'
    '<div class="container">\n'
    '  <div class="breadcrumb"><a href="index.html">首页</a><span>/</span>新闻中心</div>\n'
    '</div>\n'
    '\n'
    '<section class="section" style="padding-top:18px">\n'
    '  <div class="container">\n'
    '    <div class="section-head">\n'
    '      <div class="eyebrow">NEWS CENTER</div>\n'
    '      <h2>新闻中心 · 置业资讯</h2>\n'
    '      <p>临港新片区政策解读、市场分析、交易攻略，专业内容助您安心买房卖房</p>\n'
    '    </div>\n'
    '\n'
    '    <div class="news-filter" id="newsFilter">' + filter_btns + '</div>\n'
    '    <div class="house-grid" id="newsGrid">\n'
    + cards +
    '\n    </div>\n'
    '  </div>\n'
    '</section>\n'
    '\n'
    '<footer id="site-footer"></footer>\n'
    '\n'
    '<style>\n'
    '.news-card{background:#fff;border-radius:14px;overflow:hidden;box-shadow:var(--shadow);transition:transform .22s,box-shadow .22s;display:flex;flex-direction:column}\n'
    '.news-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}\n'
    '.news-thumb{aspect-ratio:16/9;background:var(--lake-200)}\n'
    '.news-thumb img{width:100%;height:100%;object-fit:cover}\n'
    '.news-cat{display:inline-block;font-size:12px;font-weight:700;color:var(--lake-700);background:var(--lake-100);border:1px solid var(--lake-200);padding:3px 10px;border-radius:6px;margin:14px 0 0 16px}\n'
    '.news-body{padding:0 16px 18px;flex:1;display:flex;flex-direction:column}\n'
    '.news-card h3{font-size:16px;color:var(--lake-900);line-height:1.5;margin-top:10px}\n'
    '.news-card:hover h3{color:var(--lake-700)}\n'
    '.news-card p{font-size:13px;color:var(--ink-2);margin-top:8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\n'
    '.news-meta{display:flex;gap:12px;margin-top:auto;padding-top:12px;font-size:12.5px;color:var(--ink-3)}\n'
    '.news-filter button{padding:7px 16px;border-radius:999px;border:1.5px solid var(--line);background:#fff;cursor:pointer;font-size:14px;font-family:inherit;color:var(--ink-2)}\n'
    '.news-filter button.on{background:var(--lake-600);border-color:var(--lake-600);color:#fff}\n'
    '</style>\n'
    '\n'
    + SCRIPT
)

with open(os.path.join(BASE, "news.html"), "w", encoding="utf-8") as f:
    f.write(html)
print("news.html regenerated with static cards:", len(NEWS), "articles")
