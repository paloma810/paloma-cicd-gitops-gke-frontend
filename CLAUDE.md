# CLAUDE.md — paloma-cicd-gitops-gke-frontend

## プロジェクト概要

Vue.js 3 + Vuetify 3 のフロントエンドアプリケーション。
Google Kubernetes Engine (GKE) 上で稼働し、Cloud Build で自動デプロイされる。

## ディレクトリ構成

```
src/frontend/src/
  components/     # UI コンポーネント（Login.vue, Page1.vue）
  router/         # Vue Router 設定（index.js）
  store/          # Vuex ストア（index.js）
  plugins/        # Vuetify, webfontloader 設定
  assets/         # 静的アセット
  App.vue         # ルートコンポーネント
  main.js         # エントリーポイント
```

## コーディング規約

- **Options API を使用すること**（Composition API に書き換えない）
- **Vue CLI 5 + Webpack**（Vite ではない）
- **Vuetify 3 コンポーネント**を使用（v-btn, v-text-field, v-card など）
- HTTP 通信は **axios** を使用
- 状態管理は **Vuex 4** を使用
- ルーティングは **Vue Router 4** を使用

## 認証フロー

- ログインは `src/components/Login.vue` が担当
- JWT トークンを `jwt-decode` でデコード
- 認証状態は Vuex store (`src/store/index.js`) で管理
- ルートガードは `src/router/index.js` で設定

## 絶対に変更してはいけないファイル

以下のファイルはインフラ設定ファイルのため、絶対に変更しないこと:

- `cloudbuild.yaml` — Cloud Build CI/CD パイプライン設定
- `Dockerfile_front` — Docker イメージビルド設定
- `sample-app-front-deployment.yaml` — Kubernetes デプロイメント設定
- `sample-app-front-service.yaml` — Kubernetes サービス設定
- `sample-app-front-configmap.yaml` — Kubernetes ConfigMap
- `package.json` / `package-lock.json` — 依存関係（新規パッケージ追加が必要な場合は Issue コメントで報告）

## 変更可能なファイル

- `src/frontend/src/` 配下のすべての `.vue` および `.js` ファイル

## 環境変数（本番環境）

- `NODE_ENV`: `PROD`
- `VUE_APP_BACKEND_SERVER`: `www.hato-inds.com`
- `VUE_APP_BACKEND_PORT`: `443`
- `VUE_APP_WS_HOST`: `www.hato-inds.com`
- `VUE_APP_WS_PORT`: `8080`

## インフラ情報（参考）

- GCP プロジェクト: `paloma-cicd`（イメージレジストリ）
- GKE クラスター: `kh-paloma-m01-01-gke-cluster01`（`asia-northeast1-a`）
- Artifact Registry: `asia-northeast1-docker.pkg.dev/paloma-cicd/paloma-cicd-repo-gke`
- コンテナポート: `8080`

## テスト方針（TDD）

- テストフレームワーク: Jest（`npm run test:unit`）
- テストディレクトリ: `src/frontend/tests/unit/`
- カバレッジ目標: 80% 以上
- **必ず失敗するテストを書いてから実装する（RED → GREEN → IMPROVE）**

### テスト実行コマンド
```bash
cd src/frontend
npm run test:unit                    # テスト実行
npm run test:unit -- --coverage      # カバレッジ付き実行
npm run build                        # ビルド確認
```

### TDD サイクル
1. 要件を満たす失敗テストを `tests/unit/` に作成（RED）
2. `npm run test:unit` でテストが失敗することを確認
3. 最小限の実装コードを `src/` に書く（GREEN）
4. `npm run test:unit` でテストが成功することを確認
5. リファクタリング（IMPROVE）
6. カバレッジ 80% 以上を確認

## 作業の注意事項

1. 変更は最小限に留め、要件を満たす最小の修正を行うこと
2. 変更前に必ず関連ファイルを読んでコードの文脈を把握すること
3. 既存のコードスタイル・命名規則を踏襲すること
4. 変更したファイルと変更理由を PR 本文に明記すること
