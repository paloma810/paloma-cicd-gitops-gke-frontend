# CLAUDE.md — paloma-cicd-gitops-gke-frontend

## プロジェクト概要

Next.js 14 (App Router) + MUI v5 + Zustand のフロントエンドアプリケーション。
Google Kubernetes Engine (GKE) 上で稼働し、Cloud Build で自動デプロイされる。
Vue.js 3 から完全移行済み。

## ディレクトリ構成

```
src/frontend/
  src/
    app/                    # Next.js App Router ページ
      api/config/route.ts   # GitOps 対応 config endpoint（実行時に env var を返す）
      dashboard/            # 認証済みページ（layout + page）
      login/page.tsx        # ログインページ
      layout.tsx            # ルートレイアウト（Server Component）
      providers.tsx         # クライアント ThemeProvider + configStore 初期化
      page.tsx              # / → /login リダイレクト
    components/
      LoginForm.tsx         # ログインフォーム
      BearIllustration.tsx  # くま SVG マスコット
      DashboardContent.tsx  # ダッシュボード
    lib/
      api/client.ts         # axios（request/response インターセプター）
      store/authStore.ts    # Zustand 認証 store
      store/configStore.ts  # Zustand config store（/api/config 取得）
      hooks/useHydratedStore.ts  # SSR 安全フック
  __tests__/                # Jest + React Testing Library テスト
  middleware.ts             # 認証ガード（Cookie チェック）
  next.config.mjs           # Next.js 設定（output: standalone）
  jest.config.ts            # Jest 設定（next/jest SWC）
  tsconfig.json
```

## コーディング規約

- **Next.js 14 App Router** + TypeScript
- **MUI v5** コンポーネントを使用（`@mui/material`）
- HTTP 通信は **axios** を使用（`src/lib/api/client.ts`）
- 状態管理は **Zustand**（persist なし — SSR 安全）
- ルーティングは **Next.js ファイルシステムルーティング** + `middleware.ts`

## 認証フロー

- ログインは `src/components/LoginForm.tsx` が担当
- 認証状態は Zustand store (`src/lib/store/authStore.ts`) で管理
- ルートガードは `middleware.ts` で設定（Cookie 存在チェック）
- `/dashboard` マウント時に `checkAuthentication()` で `/api/me` を検証

## GitOps 対応の環境変数設計

`NEXT_PUBLIC_*` を**使わない**。ビルド時に値が埋め込まれると GitOps が壊れるため。
`/api/config` Route がサーバー側の `process.env` を実行時に読み取りクライアントへ返す。

## 環境変数（本番環境 / Kubernetes ConfigMap）

- `NODE_ENV`: `production`
- `BACKEND_SERVER`: `www.hato-inds.com`
- `BACKEND_PORT`: `443`
- `PORT`: `8080`

## インフラ情報（参考）

- GCP プロジェクト: `paloma-cicd`（イメージレジストリ）
- GKE クラスター: `kh-paloma-m01-01-gke-cluster01`（`asia-northeast1-a`）
- Artifact Registry: `asia-northeast1-docker.pkg.dev/paloma-cicd/paloma-cicd-repo-gke`
- コンテナポート: `8080`
- Node.js バージョン要件: ≥18.17.0（Docker: node:20-alpine）

## 絶対に変更してはいけないファイル

- `cloudbuild.yaml` — Cloud Build CI/CD パイプライン設定

## テスト方針（TDD）

- テストフレームワーク: Jest + React Testing Library（`npm run test:unit`）
- テストディレクトリ: `src/frontend/__tests__/`
- カバレッジ目標: 80% 以上

### テスト実行コマンド
```bash
cd src/frontend
npm run test:unit
npm run test:unit -- --coverage
```

## Docker ビルド（M1 Mac の場合）

```bash
# ローカル検証（arm64 ネイティブ、高速）
docker build --platform linux/arm64 -f Dockerfile_front -t sample-app-front:test .

# 実行（環境変数は実行時注入）
docker run -p 8080:8080 -e BACKEND_SERVER=localhost -e BACKEND_PORT=3000 sample-app-front:test
```

## 作業の注意事項

1. 変更は最小限に留め、要件を満たす最小の修正を行うこと
2. 変更前に必ず関連ファイルを読んでコードの文脈を把握すること
3. 既存のコードスタイル・命名規則を踏襲すること
4. 変更したファイルと変更理由を PR 本文に明記すること
