# Keep Sport

## API Project

Framework: [Nestjs](https://nestjs.com/)

Project path: ```apps/web-api/```

### Script

1. Local serve
  
    Create a ```.env.local``` file in ```apps/web-api/``` and content as belows:

    ```env
    ENV=LOCAL
    PORT=4500
    ```

    RUN ```pnpm dev:api``` start a local api server.
  
2. Lint: Run ```pnpm lint:api```.
3. Test: Run ```pnpm test:api```.
4. Build: Run ```pnpm build:api```, and production code will be generated in ```dist/apps/web-api/```.

5. Production serve:

    Run build script to generate production code.

    Create a ```.env.development``` file in ```dist/apps/web-api/``` and the file content as previous as local serve ```.env.local``` file.

    Run ```pnpm start:api```.
