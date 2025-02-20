####################
# ビルドステージ
####################
FROM node:22.13.1 AS builder

ARG BUILD_ENV=prod

WORKDIR /build
COPY . .

# 環境に応じた.envファイルを使う
RUN if [ "$BUILD_ENV" = "stg" ]; then \
    cp .env.staging.example .env.production \
    ; fi

RUN if [ "$BUILD_ENV" = "prod" ]; then \
    cp .env.production.example .env.production \
    ; fi

RUN npm ci
RUN npm run build

####################
# 実行ステージ
####################
FROM node:22.13.1-alpine3.21 AS runnner

ENV NODE_ENV=production

WORKDIR /app

# コンテナ用ユーザー作成
RUN addgroup --system --gid 1001 appuser && \
    adduser --system --uid 1001 appuser

# ビルドステージからファイルをコピー
COPY --from=builder --chown=appuser:appuser /build/next.config.ts ./
COPY --from=builder --chown=appuser:appuser /build/public ./public
COPY --from=builder --chown=appuser:appuser /build/.next/static ./.next/static
COPY --from=builder --chown=appuser:appuser /build/.next/standalone ./

# コンテナのポート番号
EXPOSE 3000

# コンテナ起動ユーザー
USER appuser

# サーバー起動
CMD ["node", "server.js"]
