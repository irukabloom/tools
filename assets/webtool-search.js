/* 픽툴 웹툴 번호·키워드 검색창
   - 해민로그(category/life-webtools) 상단에 번호(#01~#05)·키워드 즉시 검색창을 붙임
   - 번호는 01/#01/1, 공휴일 달력은 02-2 로도 찾힘
   - 다른 페이지에서는 아무것도 하지 않음
*/
(function () {
  'use strict';
  if (location.pathname.indexOf('/category/life-webtools') !== 0) return;
  if (window.__wtbRun) return;
  window.__wtbRun = 1;

  var D = [
    { n: '01', t: '일본 알바 연봉의 벽 계산기', d: '시급과 근무시간으로 130만·136만 엔 벽 넘는지 계산', u: 'https://haeminlog.com/webtool-01-arubaito-kabe/', k: '알바 아르바이트 시급 연봉 벽 130만 136만 178만 유학생 주28시간 일본' },
    { n: '02', t: '2027 연차 꿀조합 계산기', d: '남은 연차로 최대 9일 연휴 만드는 조합 찾기', u: 'https://haeminlog.com/webtool-02-yeoncha-2027/', k: '연차 휴가 연휴 꿀조합 징검다리 2027 달력' },
    { n: '02', a: '02-2', t: '2027 공휴일 달력', d: '2027년 공휴일·대체공휴일·연휴 한눈에 보기', u: 'https://haeminlog.com/webtool-02-2027-holidays/', k: '공휴일 달력 대체공휴일 연휴 빨간날 2027' },
    { n: '03', t: '2026 결혼식 축의금 계산기', d: '관계와 식대를 넣으면 축의금 얼마 낼지 바로', u: 'https://haeminlog.com/webtool-03-chukuigeum/', k: '축의금 결혼식 식대 봉투 관계 참석' },
    { n: '04', t: '병맛 상장 생성기', d: '연말 모임에서 쓸 16가지 웃긴 상장 이미지 만들기', u: 'https://haeminlog.com/webtool-04-sangjang/', k: '상장 병맛 연말 시상식 지각상 읽씹 친구' },
    { n: '05', t: '2027 새해 빙고 만들기', d: '목표 채우고 도장 찍는 2027 새해 빙고판', u: 'https://haeminlog.com/webtool-05-bingo-2027/', k: '빙고 새해 목표 2027 갓생 스토리 신년계획' }
  ];
  var CH = [['#01', '알바 벽', 0], ['#02', '연차', 1], ['#02', '공휴일', 2], ['#03', '축의금', 3], ['#04', '상장', 4], ['#05', '빙고', 5]];

  for (var i = 0; i < D.length; i++) {
    D[i].h = ('#' + D[i].n + ' ' + D[i].n + ' ' + (D[i].a || '') + ' ' + D[i].t + ' ' + D[i].d + ' ' + D[i].k).toLowerCase();
  }

  var CSS = [
    '.wtb{margin:0 0 28px;padding:20px 18px 16px;background:#FFFDF5;border:2px dashed #1E3A5F;border-radius:16px;color:#1E3A5F;font-family:inherit;grid-column:1/-1;width:100%}',
    '.wtb,.wtb *{box-sizing:border-box}',
    '.wtb-kick{display:inline-block;margin:0 0 8px;padding:4px 10px;border:1.5px dashed #7DD3FC;border-radius:999px;background:#EAF8FF;color:#1E3A5F;font-size:12px;font-weight:800;letter-spacing:.12em}',
    '.wtb-h{margin:0 0 6px;color:#1E3A5F;font-size:23px;line-height:1.28;font-weight:800;letter-spacing:-.02em}',
    '.wtb-p{margin:0 0 14px;color:#3F5A78;font-size:15px;line-height:1.55}',
    '.wtb-q{width:100%;height:56px;margin:0;padding:0 16px;border:2px solid #7DD3FC;border-radius:12px;background:#fff;color:#1E3A5F;font-size:17px;font-weight:700;line-height:1.2;-webkit-appearance:none;appearance:none}',
    '.wtb-q:focus{outline:none;border-color:#1E3A5F;box-shadow:0 0 0 3px rgba(125,211,252,.45)}',
    '.wtb-q::placeholder{color:#8C9BAA;font-weight:500;opacity:1}',
    '.wtb-sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}',
    '.wtb-tip{margin:8px 0 0;font-size:13px;line-height:1.4;color:#5A7391}',
    '.wtb-chips{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 0}',
    '.wtb-chip{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:10px 15px;border:1.5px solid #7DD3FC;border-radius:999px;background:#fff;color:#1E3A5F;font-size:15px;font-weight:800;text-decoration:none;line-height:1.15}',
    '.wtb-chip b{font-size:15px;letter-spacing:-.01em}',
    '.wtb-chip:hover,.wtb-chip:focus{background:#EAF8FF;border-color:#1E3A5F;color:#1E3A5F;text-decoration:none}',
    '.wtb-list{list-style:none;margin:12px 0 0;padding:0}',
    '.wtb-list li{margin:0;padding:0;list-style:none}',
    '.wtb-a{display:flex;align-items:center;gap:11px;padding:14px 6px;border-top:1.5px dashed #BFD8EA;color:#1E3A5F;text-decoration:none}',
    '.wtb-a:hover,.wtb-a:focus{background:#FFF6DE;color:#1E3A5F;text-decoration:none}',
    '.wtb-no{flex:0 0 auto;min-width:48px;padding:5px 8px;border-radius:9px;background:#1E3A5F;color:#fff;font-size:13.5px;font-weight:800;text-align:center;letter-spacing:.02em}',
    '.wtb-nm{flex:1 1 auto;font-size:17.5px;font-weight:800;line-height:1.32}',
    '.wtb-ds{display:block;margin-top:3px;font-size:13.5px;font-weight:500;color:#5A7391;line-height:1.42}',
    '.wtb-go{flex:0 0 auto;font-size:20px;color:#7DD3FC;font-weight:800;line-height:1}',
    '@media(max-width:544px){.wtb{padding:17px 14px 14px;border-radius:14px;margin-bottom:22px}.wtb-h{font-size:20px}.wtb-p{font-size:14.5px}.wtb-q{height:54px;font-size:16px}.wtb-nm{font-size:16.5px}.wtb-chip{min-height:42px;padding:9px 13px;font-size:14.5px}.wtb-a{padding:13px 4px;gap:9px}.wtb-no{min-width:44px}}'
  ].join('');

  var st = document.createElement('style');
  st.id = 'wtb-css';
  st.appendChild(document.createTextNode(CSS));
  document.head.appendChild(st);

  var w = document.createElement('div');
  w.id = 'wtb-widget';
  w.className = 'wtb';
  w.innerHTML = ''
    + '<p class="wtb-kick">PICKTOOL · #01–#05</p>'
    + '<p class="wtb-h">번호로 바로 찾기</p>'
    + '<p class="wtb-p">번호(예: 05)나 이름을 넣으면 바로 나와요. 아래 칩을 누르면 한 번에 이동합니다.</p>'
    + '<label class="wtb-sr" for="wtb-q">웹툴 번호나 이름으로 찾기</label>'
    + '<input id="wtb-q" class="wtb-q" type="search" placeholder="번호(#05)나 이름으로 찾기" autocomplete="off" enterkeyhint="search" aria-controls="wtb-list">'
    + '<p class="wtb-tip" id="wtb-tip" aria-live="polite"></p>'
    + '<div class="wtb-chips" id="wtb-chips"></div>'
    + '<ul class="wtb-list" id="wtb-list"></ul>';

  var inp = w.querySelector('#wtb-q');
  var list = w.querySelector('#wtb-list');
  var chips = w.querySelector('#wtb-chips');
  var tip = w.querySelector('#wtb-tip');

  for (var c = 0; c < CH.length; c++) {
    var ch = document.createElement('a');
    ch.className = 'wtb-chip';
    ch.href = D[CH[c][2]].u;
    ch.innerHTML = '<b>' + CH[c][0] + '</b> ' + CH[c][1];
    ch.setAttribute('title', CH[c][0] + ' ' + D[CH[c][2]].t);
    chips.appendChild(ch);
  }

  function norm(s) {
    var out = '';
    for (var i = 0; i < s.length; i++) {
      var c = s.charAt(i);
      if (c === '#' || c === '＃' || c === '번') out += ' ';
      else out += c;
    }
    var parts = out.toLowerCase().split(' '), clean = [];
    for (var j = 0; j < parts.length; j++) if (parts[j] !== '') clean.push(parts[j]);
    return clean.join(' ');
  }

  function numKey(t) {
    var d = '', k = 0;
    while (k < t.length && t.charAt(k) >= '0' && t.charAt(k) <= '9') { d += t.charAt(k); k++; }
    if (!d) return '';
    if (k === t.length) return d.length > 2 ? '' : ('0' + d).slice(-2);
    if (t.charAt(k) === '-' && k + 2 === t.length) return ('0' + d).slice(-2) + t.substring(k);
    return '';
  }

  function hit(e, t) {
    var nk = numKey(t);
    if (nk) return e.n === nk || e.a === nk;
    return e.h.indexOf(t) >= 0;
  }

  function row(e) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.className = 'wtb-a';
    a.href = e.u;
    var no = document.createElement('span');
    no.className = 'wtb-no';
    no.textContent = '#' + e.n;
    var nm = document.createElement('span');
    nm.className = 'wtb-nm';
    nm.textContent = e.t;
    var ds = document.createElement('span');
    ds.className = 'wtb-ds';
    ds.textContent = e.d;
    nm.appendChild(ds);
    var go = document.createElement('span');
    go.className = 'wtb-go';
    go.textContent = '→';
    a.appendChild(no); a.appendChild(nm); a.appendChild(go);
    li.appendChild(a);
    return li;
  }

  function render() {
    var q = norm(inp.value);
    list.innerHTML = '';
    if (!q) { tip.textContent = '#01~#05 중에 고르거나, 이름 한 글자만 넣어 보세요.'; return; }
    var toks = q.split(' '), res = [];
    for (var i = 0; i < D.length; i++) {
      var ok = true;
      for (var j = 0; j < toks.length; j++) if (!hit(D[i], toks[j])) { ok = false; break; }
      if (ok) res.push(D[i]);
    }
    if (!res.length) { tip.textContent = '그 번호나 이름은 아직 없어요. #01~#05를 눌러 보세요.'; return; }
    tip.textContent = res.length + '개 찾았어요. 누르면 바로 이동해요.';
    for (var r = 0; r < res.length; r++) list.appendChild(row(res[r]));
  }

  inp.addEventListener('input', render);
  inp.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter') {
      var a = list.querySelector('a');
      if (a) { ev.preventDefault(); location.href = a.getAttribute('href'); }
    } else if (ev.key === 'Escape') { inp.value = ''; render(); }
  });

  var main = document.getElementById('main') || document.querySelector('.site-main');
  if (!main) return;
  var hd = main.querySelector('.page-header');
  if (hd && hd.parentNode === main) hd.parentNode.insertBefore(w, hd.nextSibling);
  else main.insertBefore(w, main.firstChild);
  render();
})();
