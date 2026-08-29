# Playwright MCP による確認手順

ツール名は Playwright MCP のバージョンによって異なることがある。ここでは代表的な名前で
記述しているので、実際に利用可能なツール名に読み替える。

## axe-core の実行

スキルに同梱されている `assets/axe.min.js` を使う。CDN からは読み込まない
（サプライチェーン攻撃の懸念があり、同梱している理由でもある）。パスはこのスキルの
ディレクトリからの相対パスであり、作業ディレクトリからの相対パスではない。

### 方法 A: 同梱スクリプト `scripts/run-axe.mjs`（推奨。初期表示・URL で再現できる状態向け）

`axe.min.js` は約 570KB あり、`browser_evaluate` に一度に渡せないことが多い。初期表示や、
URL だけで再現できる状態が対象なら、同梱のランナーを Bash から実行するのが確実。

```
node <スキルのディレクトリ>/scripts/run-axe.mjs <url> [--width 1280] [--height 900] [--out result.json]
```

- 対象タグ（`wcag2a wcag2aa wcag21a wcag21aa wcag22aa best-practice`）と出力形式は、下記の
  スニペットと揃えてある。同梱の `assets/axe.min.js` を読み込み、CDN は使わない。
- Playwright と Chromium は自動的に探す（同 `scripts/browser.mjs` が、Playwright MCP が
  持ち込む `playwright-core` や `ms-playwright` キャッシュのブラウザを検出する）。見つからない
  ときはエラーメッセージに従う。
- `--help` で全オプションを表示できる。

### 方法 B: Playwright MCP に注入（状態を変えた画面が対象のとき）

モーダルを開いた・エラーを表示させたなど、**MCP でその状態を作ってからその場で axe を
かけたい**場合は、注入して実行する。方法 A とは別ブラウザにならないため、状態を保ったまま
検査できる。

1. `assets/axe.min.js` を Read で読み、その内容を `browser_evaluate` で実行して
   ページに `axe` を定義する。ファイルが大きいため、以下のいずれかの方法を取る。
   - `browser_evaluate` に、ファイル内容を含む関数を渡して実行する
   - あるいは、`fetch` を使わずに `<script>` 要素をページに追加する方法として、
     ファイル内容を文字列として `new Function(source)()` で評価する

2. `axe` が定義されたことを確認してから実行する。`typeof axe` で確認できる。

```js
() => axe.run(document, {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']
  },
  resultTypes: ['violations', 'incomplete']
}).then(r => ({
  violations: r.violations.map(v => ({
    id: v.id,
    impact: v.impact,
    help: v.help,
    tags: v.tags,
    nodes: v.nodes.slice(0, 10).map(n => ({
      target: n.target,
      html: n.html.slice(0, 300),
      failureSummary: n.failureSummary
    })),
    total: v.nodes.length
  })),
  incomplete: r.incomplete.map(v => ({
    id: v.id,
    help: v.help,
    nodes: v.nodes.slice(0, 10).map(n => ({ target: n.target, html: n.html.slice(0, 200) })),
    total: v.nodes.length
  })),
  version: axe.version,
  url: location.href
}))
```

ノード数を制限しているのは、指摘が多いページで出力が膨大になるのを防ぐため。
`total` で全体の件数がわかるので、レポートには件数を書き、代表例を挙げる。

### 状態を変えて再実行する

axe-core は「今その瞬間の DOM」しか見ない。以下のたびに再実行する。

- モーダル、ドロップダウン、メニュー、アコーディオンを開いた状態
- タブを切り替えた状態
- バリデーションエラーを表示させた状態
- 検索結果あり／なしの状態
- ビューポートを変更した状態（モバイル表示で別の UI が出る場合）

### incomplete の扱い

`incomplete` は「axe-core が自動では判定できなかった」項目であり、問題がないという意味では
ない。特に以下は手動確認が必要。

| ルール | 手動で確認すること |
| --- | --- |
| `color-contrast` | 背景が画像・グラデーション・重なりのある箇所。スクリーンショットから色を読み取り、`contrast.mjs` 相当の計算で判定する（VIS-09） |
| `aria-*` 系 | ページの目的に照らして role や属性が正しいか（SEM-11） |
| `frame-*` | iframe の中身。同一オリジンでなければ確認できない |

## キーボード操作の確認

### フォーカスの巡回

要素数が多いページを一気に巡回するなら、同梱スクリプトが速い。実際の `:focus-visible` 適用
状態でフォーカスインジケーターの有無まで記録する。

```
node <スキルのディレクトリ>/scripts/focus-walk.mjs <url> [--max 60] [--out forward.json]
node <スキルのディレクトリ>/scripts/focus-walk.mjs <url> --reverse [--out reverse.json]
```

- 各ステップの `tag` `role` `name` `selector` `tabIndex` `rect` `visible` `outline`
  `boxShadow` `focusIndicator` を JSON で出力する。**`--reverse` で逆方向（Shift+Tab）の巡回も
  必ず実行し、順方向と比較する。**
- `focusIndicator` は outline か box-shadow の有無による近似。最終的な視認性はスクリーンショット
  でも確認する（KBD-08 は「実際に見えるか」が本質）。
- モーダルを開いた状態などは URL だけで再現できないため、下記の手順で MCP から確認する。

MCP で1ステップずつ確認する場合は以下。

1. ページ冒頭にフォーカスを戻す（アドレスバーからの `Tab` に相当する状態を作るため、
   `browser_evaluate` で `document.body.focus()` の後 `document.activeElement.blur()` するか、
   ページを再読み込みする）
2. `browser_press_key` で `Tab` を押し、その都度フォーカス位置を取得する

フォーカス位置の取得には以下を使う（`scripts/focus-walk.mjs` が出力する項目と同じ）。

```js
() => {
  const el = document.activeElement;
  if (!el || el === document.body) return { focused: null };
  const rect = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  return {
    tag: el.tagName.toLowerCase(),
    role: el.getAttribute('role'),
    name: el.getAttribute('aria-label') || el.textContent?.trim().slice(0, 80),
    selector: el.id ? `#${el.id}` : el.className ? `${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]}` : el.tagName.toLowerCase(),
    tabIndex: el.tabIndex,
    rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
    // 画面内に見えているか（KBD-07: 見えないものにフォーカスが移動していないか）
    visible: rect.width > 0 && rect.height > 0 &&
             rect.bottom > 0 && rect.top < innerHeight &&
             style.visibility !== 'hidden' && style.opacity !== '0',
    outline: `${style.outlineStyle} ${style.outlineWidth} ${style.outlineColor}`,
    boxShadow: style.boxShadow,
  };
}
```

得られた順序を記録し、以下を判定する。

- **KBD-07**: 視覚的な配置（`rect` の座標）と移動順序が一致しているか。
  `visible: false` の要素にフォーカスが移動していないか。`tabIndex` に正数がないか
- **KBD-08**: `outline` が `none` で、かつ `boxShadow` もない要素がないか。
  フォーカス時のスクリーンショットで、実際にインジケーターが見えるか
- **KBD-09**: フォーカス要素の `rect` が、固定ヘッダー・フッターの領域に隠れていないか。
  疑わしい場合はスクリーンショットで確認する

**`Shift+Tab` による逆方向の巡回も必ず行う。** 末尾から冒頭まで戻り、順方向と同じ要素に
到達できるかを比較する。順方向でしか到達できない要素、逆方向で順序が変わる箇所は問題である。

要素数が多い場合は、主要な操作領域（フォーム、ナビゲーション、モーダル）に絞ってよいが、
絞った範囲をレポートに明記する。

### UI コンポーネントの操作

- モーダル・ドロップダウン: 開いた状態で `Tab` を繰り返し、フォーカスが外に出ないか
  （KBD-05）。`Escape` で閉じるか。閉じた後にフォーカスが開いた元の要素に戻るか
- メニュー・タブ・リストボックス: 矢印キー（`ArrowDown` `ArrowUp` `ArrowRight` `ArrowLeft`）、
  `Home` `End` での操作
- ボタン・リンク: `Enter` と `Space`（`<button>` は両方、`<a>` は `Enter` で動作するのが標準）
- ホバーで出るもの: `Escape` で消えるか（KBD-01）、内部にフォーカスを移動できるか（KBD-02）

### マウス操作でしか動かない機能を探す（KBD-04）

手順 5（マウス操作）で操作できた機能のすべてについて、キーボードのみでも実行できるかを
試す。ドラッグ＆ドロップ、ホバーで出るメニュー、スワイプ、カルーセルの送りに注意する。

## lang の確認

```js
() => ({
  htmlLang: document.documentElement.lang || null,
  // デフォルト以外の lang が指定されている要素
  others: [...document.querySelectorAll('[lang]')]
    .filter(el => el !== document.documentElement)
    .map(el => ({ lang: el.lang, text: el.textContent?.trim().slice(0, 60) })),
})
```

`htmlLang` が `null` や空なら SEM-09 の問題。日本語のページで `en` になっている場合も問題
（テンプレートの初期値が残っている典型的なケース）。

## ランドマークと見出しのアウトライン

```js
() => ({
  landmarks: [...document.querySelectorAll(
    'header,nav,main,aside,footer,section,form,search,[role]'
  )].filter(el => {
    const r = el.getAttribute('role');
    const implicit = { HEADER: 'banner', NAV: 'navigation', MAIN: 'main',
                       ASIDE: 'complementary', FOOTER: 'contentinfo', SEARCH: 'search' };
    return r ? ['banner','navigation','main','complementary','contentinfo','search','region','form'].includes(r)
             : !!implicit[el.tagName];
  }).map(el => ({
    tag: el.tagName.toLowerCase(),
    role: el.getAttribute('role'),
    name: el.getAttribute('aria-label') ||
          document.getElementById(el.getAttribute('aria-labelledby'))?.textContent?.trim() || null,
  })),
  headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,[role="heading"]')].map(el => ({
    level: el.getAttribute('aria-level') || el.tagName[1],
    text: el.textContent?.trim().slice(0, 80),
  })),
  title: document.title,
})
```

- `main` が1つあるか、その中にそのページ固有のコンテンツがあるか（SEM-07）
- 見出しレベルが飛んでいないか、`h1` があるか
- 同じ種類のランドマークが複数あるとき、`name` で区別できるか

## ライブリージョンの確認（SEM-12）

操作の前に、ライブリージョンとして宣言されている要素を記録する。

```js
() => [...document.querySelectorAll('[aria-live],[role="status"],[role="alert"],[role="log"],[role="progressbar"]')]
  .map(el => ({
    role: el.getAttribute('role'),
    live: el.getAttribute('aria-live'),
    atomic: el.getAttribute('aria-atomic'),
    text: el.textContent?.trim().slice(0, 100),
  }))
```

その後で操作（フォーム送信、検索、削除など）を行い、再度取得して比較する。

- 通知したい内容が、ライブリージョンの**中で**変化しているか
- ライブリージョンの要素そのものが後から挿入されていないか（挿入されると通知されないことが
  多い）。操作前のスナップショットに要素が存在したかを確認する
- 変化と同時にフォーカス移動が発生していないか（スクリーンリーダーでは通知が読み上げられない
  ことがしばしばある）

## スクリーンショット

以下の場面では撮っておくと、レポートの説得力が上がり、後からの確認もできる。

- 指摘の対象となっている箇所
- フォーカスインジケーターが見えない／見えにくい状態（KBD-08）
- 320px 幅、200% ズーム、文字サイズ変更、テキスト間隔変更での表示崩れ（RFL-01〜04）
- コントラスト比が疑わしい箇所（色の抽出にも使う）

### 保存先の指定（重要）

**すべてのスクリーンショットは、必ず `a11y-report/assets/` の下に保存する。**
`browser_take_screenshot` は保存先を指定しないと作業ディレクトリ（カレントディレクトリ）に
ファイルを撒き散らす。これを避けるため、**呼び出しのたびに `filename` パラメータに
`a11y-report/assets/` から始まるパスを明示的に渡す。**

```
browser_take_screenshot: filename=a11y-report/assets/hero-desktop.png
```

- ディレクトリが無ければ、先に Bash で `mkdir -p a11y-report/assets` を実行しておく。
- これは**レポートに載せる最終的なスクリーンショットだけでなく、色の抽出や表示崩れの確認の
  ために一時的に撮るものも同じ。** 一時ファイルであってもカレントディレクトリには保存しない。
- レポートからは `assets/…` の相対パスで参照する。

**ログインフォームに資格情報を入力した状態や、個人情報が表示されている画面は撮らない。**
