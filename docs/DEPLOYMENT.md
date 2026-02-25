# Deployment & migration guide

This doc covers deploying **VoxVertex Connect** to Vercel or AWS, and **migrating the database** from MongoDB to AWS later.

---

## 1. Deploy frontend to Vercel

1. Push the repo to GitHub/GitLab/Bitbucket and import the project in [Vercel](https://vercel.com).
2. Use **root** as the project root (do not set Root Directory to `apps/frontend`).
3. Vercel will use the repo root `vercel.json`:
   - **Build Command:** `npm run build --workspace=frontend`
   - **Output Directory:** `apps/frontend/dist`
   - **Install Command:** `npm install`
4. Add env vars in Vercel if needed:
   - `VITE_API_URL` – set to your backend API URL in production (e.g. `https://api.yourdomain.com`). Omit if the API is on the same domain and you configure proxy/rewrites.
5. Deploy. The frontend will be served as a static SPA; client-side routes are handled by the rewrite in `vercel.json`.

**Backend:** The backend (Node/Express) is **not** deployed by this Vercel project. Run it separately (see AWS or another host below), then set `VITE_API_URL` so the frontend can call it.

---

## 2. Run backend (current: Node + MongoDB)

- **Local:** From repo root: `npm run dev` (runs frontend + backend), or `npm run dev --workspace=backend`.
- **Production:** Run the backend on any Node host (e.g. Railway, Render, Fly.io, or AWS ECS/EC2). Set env:
  - `PORT` (e.g. 5000)
  - `MONGO_URI` (MongoDB Atlas or your MongoDB URL)
  - Optionally `NODE_ENV=production`

**Docker (e.g. for AWS ECS):**

```bash
# From repo root
docker build -f apps/backend/Dockerfile -t voxvertex-backend .
docker run -p 5000:5000 -e MONGO_URI="your-uri" voxvertex-backend
```

---

## 3. Deploy full stack on AWS

- **Frontend:** Build `apps/frontend` and deploy the `apps/frontend/dist` output to **S3 + CloudFront** (static hosting).
- **Backend:** Run the backend as:
  - **ECS (Fargate):** Use the provided `apps/backend/Dockerfile`. Build and push the image to **ECR**, then run a service (e.g. behind an Application Load Balancer). Set `MONGO_URI` (and later DB credentials) via ECS task env or Secrets Manager.
  - **EC2:** Install Node, clone repo, `npm install --workspace=backend`, `node apps/backend/src/index.js` (or use PM2). Put Nginx/Caddy in front if needed.
- **Env:** Use **Systems Manager Parameter Store** or **Secrets Manager** for `MONGO_URI` and other secrets; inject into ECS tasks or EC2.

---

## 4. Migrating database from MongoDB to AWS

The codebase is structured so you can switch the database without changing API or frontend.

### Current setup

- **Config:** `apps/backend/src/config/env.js` – `DB_ADAPTER` (default `mongodb`).
- **Data layer:** `apps/backend/src/repositories/` – `userRepository.mongo.js` implements user persistence with Mongoose. Other code should use `repositories/userRepository`, not the Mongoose model directly.

### Steps to migrate to AWS (e.g. DynamoDB or Amazon DocumentDB)

1. **Add a new repository implementation**
   - Create `apps/backend/src/repositories/userRepository.aws.js` that implements the same interface as `userRepository.mongo.js`:
     - `createUser(data)`
     - `findByEmailAndType(email, type)`
     - `findById(id)`
   - Implement these using **AWS SDK** (e.g. DynamoDB DocumentClient) or **DocumentDB** (MongoDB-compatible; you might keep Mongoose and only change the connection string).

2. **Switch adapter via env**
   - Set `DB_ADAPTER=aws` in production env (e.g. Vercel, ECS, or Parameter Store).
   - `repositories/index.js` already loads `userRepository.aws.js` when `DB_ADAPTER=aws`.

3. **Data migration**
   - Export data from MongoDB (e.g. `mongoexport` or a one-off script).
   - Import into DynamoDB/DocumentDB using your own script or AWS tools. Keep the same logical fields so `userRepository.aws.js` can read them.

4. **Optional: connection module for AWS**
   - If you use DynamoDB, add something like `apps/backend/src/config/aws.js` that initializes the SDK (region, credentials from env or IAM role). Use it only when `DB_ADAPTER=aws`.

After this, the rest of the app (routes, services) stays the same; only the repository implementation and env change.

---

## 5. Env reference

| Variable        | Where       | Description |
|----------------|-------------|-------------|
| `PORT`         | Backend     | Server port (default 5000). |
| `MONGO_URI`    | Backend     | MongoDB connection string. |
| `DB_ADAPTER`   | Backend     | `mongodb` (default) or `aws` after migration. |
| `NODE_ENV`     | Backend     | `development` or `production`. |
| `VITE_API_URL` | Frontend    | API base URL in production (optional). |

Use `.env` locally (see root and `apps/backend` `.env.example`). In production, set these in the platform (Vercel, ECS, etc.) or in AWS Parameter Store/Secrets Manager.
