# Next.js v15のサンプル  
Next.jsのv15のサンプルコードです。
  
## 使用技術
* **Node.js:** 22.13.1
* **Next.js:** 15.1.6
* **React:** ^19.0.0
* **TypeScript:** ^5.0.0
* **Tailwind CSS:** ^3.4.1
* **Storybook:** ^8.5.1
* **dprint:** ^0.48.0
  
## 使い方
**1. 環境変数ファイルをコピーしてリネーム:**
```bash
cp .env.example .env
```
  
**2. 依存関係をインストール:**
```bash
npm ci
```
  
**3-1. Next.jsのローカルサーバー起動:**
```bash
npm run dev
```
  
**3-2. Storybookのローカルサーバー起動:**
```bash
npm run storybook
```
  
## その他コマンド
**1. dprint & ESLintのチェック:**
```bash
npm run fix
```

## Dockerfileのビルド用コマンド
**1. ビルド:**
```bash
docker build --no-cache --build-arg BUILD_ENV=prod -f ./docker/Dockerfile -t next15sample:latest .
```
  
**2. コンテナ起動:**
```bash
docker run -p 80:3000 next15sample:latest
```
