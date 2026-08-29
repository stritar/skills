# フレームワーク・ライブラリ別の注意点

対象が使用している技術に応じて該当する節を読む。ここに挙げるのは典型的なパターンであり、
網羅ではない。観点表による確認を置き換えるものではない。

## React / Next.js

### 非対話要素へのハンドラ（KBD-04, SEM-11）

```jsx
<div onClick={handleClick}>削除</div>          // フォーカスできず、キーボードで実行できない
<span onClick={...} role="button" tabIndex={0}> // まだ不足。onKeyDown が必要
```

`<button type="button">` を使うのが正解。`type` を省略するとフォームの中で `submit` に
なるため、フォーム内のボタンでは `type` の指定漏れも確認する。

### フォーカス管理（KBD-05, KBD-09）

- モーダルを開いたときに、ダイアログ内へフォーカスを移動しているか
- 閉じたときに、開いた元の要素へフォーカスを戻しているか
- `useEffect` でのフォーカス移動が、レンダリングのタイミングに依存して失敗していないか
- `createPortal` で DOM 上の位置が離れた場合、DOM 順序としてのフォーカス順序が不自然に
  なっていないか

`<dialog>` の `showModal()` を使っている場合、フォーカストラップ・`Esc` での閉鎖・
背景の不活性化はブラウザが提供する。自前実装の場合はすべて確認が必要。

### id の生成（SEM-03, SEM-11）

`useId()` を使わずにハードコードされた `id` は、コンポーネントが同一ページに複数配置された
ときに重複する。`id` の重複は `<label for>` や `aria-labelledby` の紐付けを壊す。

### その他

- `dangerouslySetInnerHTML` の中身は静的に判定できない（`component-tracing.md` 参照）
- `<a>` を `onClick` での画面遷移に使い `href` を持たないもの（フォーカスできない）
- Next.js: `<html lang>` は `app/layout.tsx` またはカスタム `_document` で指定する（SEM-09）
- Next.js: ページ遷移時のフォーカス移動とタイトル更新（VIS-17）
- `next/image` の `alt` は必須プロパティだが、`alt=""` の妥当性は別途判断が必要

## Vue / Nuxt

- 非対話要素への `@click`（React と同じ問題）
- `v-show` は `display: none` になるため支援技術からも隠れる。`v-if` との使い分けが
  適切か。逆に、視覚的に隠しているつもりが `opacity: 0` や `height: 0` で、
  支援技術からは読めてしまう・フォーカスできてしまう箇所がないか
- `<transition>` の途中の状態でフォーカスやライブリージョンが期待通りに働くか
- `v-html` の中身は静的に判定できない
- Nuxt: `<html lang>` は `nuxt.config` の `app.head.htmlAttrs.lang` で指定する

## Svelte / SvelteKit

- Svelte のコンパイラは a11y 警告を出す（`a11y-click-events-have-key-events` など）。
  警告が抑制（`svelte-ignore`）されている箇所は、**抑制の理由が妥当か**を確認する
- `{@html}` の中身は静的に判定できない

## Angular

- `(click)` を非対話要素に付けているもの
- `*ngIf` と `[hidden]` の使い分け
- `@angular/cdk/a11y` の `FocusTrap` `LiveAnnouncer` が使われているか

## Tailwind CSS

| クラス | 確認すること |
| --- | --- |
| `outline-none` `focus:outline-none` | 代替のフォーカススタイルがあるか（KBD-08）。`focus-visible:ring` のみの場合、ハイコントラストモードで消える |
| `sr-only` | アイコンのみのボタンに視覚的に隠したラベルが付いているか。逆に `hidden` を使ってしまい支援技術からも消えていないか |
| `w-4 h-4` などの固定サイズ | ターゲットサイズ 24×24px を満たすか（VIS-24）。padding での拡張を含めて確認する |
| `text-gray-400` など | 背景色とのコントラスト比を計算する（VIS-09）。薄いグレーは不足しがち |
| `truncate` `overflow-hidden` | 文字サイズ変更・テキスト間隔変更で切れないか（RFL-02, RFL-04） |
| `w-[320px]` など固定幅 | 320px 幅でのリフロー（RFL-03） |
| `pointer-events-none` | 無効化の手段として使われている場合、支援技術からは操作可能に見える |

`tailwind.config` のカスタムカラーは、コントラスト比の計算のために値を解決する必要がある。

## CSS-in-JS（styled-components / emotion / vanilla-extract）

- 色がテーマオブジェクト経由で決まる場合、テーマ定義まで辿って値を解決する
- `&:focus { outline: none }` の指定
- props によって色が変わる実装は、取りうる組み合わせをすべて確認する

## Web Components / Shadow DOM

- `aria-labelledby` `aria-describedby` `for` は **Shadow DOM の境界を越えられない**。
  ホスト側の `id` を Shadow root 内から参照しても解決されない
- スロットに渡されたコンテンツの扱い
- `delegatesFocus` の指定とフォーカス順序

## UI コンポーネントライブラリ

Radix UI、Headless UI、Ark UI、MUI、Chakra UI、Ant Design などを使っている場合。

- **ライブラリが提供するアクセシビリティ機能を、使い方によって壊していないことを確認する。**
  よくあるのは以下。
  - `Dialog.Title` を使わず、ダイアログにアクセシブルネームがない
  - `asChild` や `as` で別の要素に差し替えた結果、ロールが変わっている
  - ラベル用のコンポーネントを使わず、独自のテキストを置いている
  - スタイルの上書きでフォーカスリングを消している
- ライブラリ内部の実装は辿らない。パッケージ名とバージョンを記録し、確実でない部分は
  「要追加確認」として実ページでの確認に回す

## テンプレートエンジン（ERB / Blade / Twig / Jinja / Pug / Astro）

- 部分テンプレート（partial / include）を辿って全体のマークアップを組み立てる
- レイアウトテンプレートに `<html lang>` `<title>` `<main>` があるか（SEM-09, VIS-17, SEM-07）
- ループ内で生成される `id` が重複していないか
- エスケープの有無は、アクセシビリティではなくセキュリティの問題だが、気づいたら報告する

## 静的な HTML

- テンプレートから複製されたページ間で、`<title>` が使い回されていないか（VIS-17）
- ナビゲーションの順序がページ間で一貫しているか（VIS-25）
- 複数ページある場合、すべてを対象にできているか
