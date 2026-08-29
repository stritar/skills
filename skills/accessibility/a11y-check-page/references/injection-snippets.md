# 表示変更のためのスニペット

RFL-01〜05 の確認で使用する。いずれも `browser_evaluate` および `browser_resize` で行う。

**各変更を行った後は、必ず元に戻してから次の確認に進む。** 変更が残ったまま別の観点を
確認すると、誤った判定につながる。

## 共通: 変更を戻す

各スニペットは `id` を付けた `<style>` を挿入する。以下で除去する。

```js
() => {
  for (const id of ['a11y-check-text-spacing', 'a11y-check-font-size', 'a11y-check-zoom']) {
    document.getElementById(id)?.remove();
  }
  return 'reset';
}
```

ビューポートは `browser_resize` で元のサイズに戻す。

## RFL-01: ブラウザのズーム 200%

ブラウザのズーム機能そのものは Playwright から直接操作できないため、**ビューポートを
半分にする**ことで等価な状態を作る。ズーム 200% は、CSS ピクセルの利用可能領域が
半分になることと同義である。

```
browser_resize: width=640, height=512   (1280×1024 の 200% 相当)
```

CSS の `zoom` による代替も可能だが、`position: fixed` や `vh` の扱いがブラウザのズームとは
異なるため、**ビューポートを縮める方法を優先する**。

```js
// 代替手段。挙動が実際のズームと異なる場合があることを念頭に置く
() => {
  const s = document.createElement('style');
  s.id = 'a11y-check-zoom';
  s.textContent = ':root { zoom: 2 }';
  document.head.appendChild(s);
  return 'zoom 200%';
}
```

確認すること: コンテンツの重なり、切れ、二次元スクロールの発生、操作可能な要素への到達。

## RFL-02: フォントサイズ 32

ブラウザの設定（既定 16px）を 32 にした状態を再現する。

```js
() => {
  const s = document.createElement('style');
  s.id = 'a11y-check-font-size';
  s.textContent = 'html { font-size: 32px !important; }';
  document.head.appendChild(s);
  return 'font-size 32px';
}
```

**この方法には限界がある。** ブラウザの設定変更は「フォントサイズを px で固定していない
要素」にのみ影響するが、上記の CSS は `html` の `font-size` を上書きするだけなので、
`rem` を使っている箇所には効くが、`px` 固定の箇所には効かない。

`px` 固定の箇所が多い場合、**それ自体が RFL-02 の問題**である（ブラウザのフォントサイズ設定に
追従しない）。以下で px 指定されたテキストの量を確認できる。

```js
() => {
  const els = [...document.querySelectorAll('body *')].filter(el =>
    el.children.length === 0 && el.textContent?.trim());
  const px = els.filter(el => {
    const decl = el.style.fontSize || '';
    return decl.endsWith('px');
  });
  return { textElements: els.length, inlinePxFontSize: px.length };
}
```

インラインスタイルしか見られないため、スタイルシート側の指定はソースコード側での確認
（`a11y-check-code` の RFL-02）と突き合わせる。

確認すること: 文字の切れ、コンテナからのはみ出し、レイアウト崩れ、ボタンラベルの重なり。

## RFL-03: リフロー 320px 幅

```
browser_resize: width=320, height=800
```

横スクロールが発生しているかを判定する。

```js
() => ({
  documentWidth: document.documentElement.scrollWidth,
  viewportWidth: window.innerWidth,
  hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth + 1,
  // はみ出している要素を特定する
  overflowing: [...document.querySelectorAll('body *')]
    .filter(el => el.getBoundingClientRect().right > window.innerWidth + 1)
    .slice(0, 20)
    .map(el => ({
      selector: el.id ? `#${el.id}` : `${el.tagName.toLowerCase()}${el.className ? '.' + String(el.className).split(' ')[0] : ''}`,
      right: Math.round(el.getBoundingClientRect().right),
      text: el.textContent?.trim().slice(0, 40),
    })),
})
```

横スクロールのコンテンツの場合は、代わりに `height=256` にして縦方向で同様に判定する。

**コンテンツの性質上必要なもの（巨大な図表、地図、データテーブル）は例外**として扱う。
はみ出している要素がこれらに該当するかを確認してから指摘する。

## RFL-04: テキストの間隔

WCAG SC 1.4.12 の基準値をすべて適用する。

```js
() => {
  const s = document.createElement('style');
  s.id = 'a11y-check-text-spacing';
  s.textContent = `
    * , *::before, *::after {
      line-height: 1.5 !important;
      letter-spacing: 0.12em !important;
      word-spacing: 0.16em !important;
    }
    p, li, dd, dt, blockquote, h1, h2, h3, h4, h5, h6 {
      margin-bottom: 2em !important;
    }
  `;
  document.head.appendChild(s);
  return 'text spacing applied';
}
```

適用後、切り詰めや重なりが起きている要素を検出する。

```js
() => [...document.querySelectorAll('body *')]
  .filter(el => {
    if (el.children.length > 0 || !el.textContent?.trim()) return false;
    // 内容が要素の領域からあふれている
    return el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1;
  })
  .slice(0, 20)
  .map(el => ({
    selector: el.id ? `#${el.id}` : `${el.tagName.toLowerCase()}${el.className ? '.' + String(el.className).split(' ')[0] : ''}`,
    text: el.textContent.trim().slice(0, 40),
    overflowY: el.scrollHeight - el.clientHeight,
    overflowX: el.scrollWidth - el.clientWidth,
  }))
```

この検出は目安であり、`overflow: visible` ではみ出して重なっている場合は検出できない。
スクリーンショットでの目視も併せて行う。

## RFL-05: モバイル表示での確認

スマートフォンの解像度で、縦向き・横向きの両方を確認する（VIS-05 も同時に確認できる）。

```
browser_resize: width=375, height=667   (iPhone SE 第2〜3世代 相当・縦向き)
browser_resize: width=667, height=375   (同・横向き)
```

**この状態で新たに現れた UI（ハンバーガーメニュー、ボトムシート、モバイル用ナビゲーション）は
未チェックである。** axe-core の再実行、キーボード操作、機械可読性の確認を改めて行う。

横向きで「縦向きにしてください」というメッセージが表示され利用できない場合は、VIS-05 の
問題として指摘する。

## ターゲットサイズの実測（VIS-24）

```js
() => {
  const targets = [...document.querySelectorAll(
    'a[href],button,input:not([type=hidden]),select,textarea,[role="button"],[role="link"],[role="checkbox"],[role="tab"],[onclick]'
  )];
  return targets
    .map(el => {
      const r = el.getBoundingClientRect();
      return {
        selector: el.id ? `#${el.id}` : `${el.tagName.toLowerCase()}${el.className ? '.' + String(el.className).split(' ')[0] : ''}`,
        name: (el.getAttribute('aria-label') || el.textContent?.trim() || '').slice(0, 40),
        w: Math.round(r.width), h: Math.round(r.height),
        // 文中のインライン要素は例外規定に該当する可能性がある
        inline: getComputedStyle(el).display.startsWith('inline'),
      };
    })
    .filter(t => t.w > 0 && t.h > 0 && (t.w < 24 || t.h < 24));
}
```

検出されたものは、そのまま指摘してはならない。VIS-24 の例外規定（間隔、同等、インライン、
ユーザーエージェントによる制御、必要不可欠）に該当しないかを確認する。文中のリンクテキストと、
ブラウザのデフォルトスタイルのチェックボックス・ラジオボタンは、通常は例外に該当する。

## ホバーで表示される追加コンテンツ（VIS-11〜13）

1. `browser_hover` でトリガー要素にポインタを乗せ、追加コンテンツが表示されることを確認する
2. **VIS-11**: ポインタを動かさずに `browser_press_key` で `Escape` を押し、消えるか確認する
3. **VIS-12**: 表示されたコンテンツの上に `browser_hover` で移動し、表示が維持されるか確認する。
   トリガーとコンテンツの間に隙間がある場合、その途中の座標でも消えないかを確認する
4. **VIS-13**: ホバーしたまま数秒待ち、自動的に消えないかを確認する

フォーカスによる表示（KBD-01〜03）も、`Tab` でトリガーにフォーカスして同様に確認する。
