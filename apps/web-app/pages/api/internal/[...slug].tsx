import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy = createProxyMiddleware({
  target: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
  changeOrigin: true,
  pathRewrite: { '^/api/internal': '/api' },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  proxy(req, res, (err) => {
    throw err;
  });
}
