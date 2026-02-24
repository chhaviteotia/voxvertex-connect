# MongoDB Atlas setup guide

This backend uses **MongoDB Atlas** (cloud) for the database. Follow these steps to connect your app.

---

## Quick checklist (if connection still fails)

- [ ] **Network Access**: In Atlas → **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`).
- [ ] **Database user**: In Atlas → **Database Access** → user exists with **Read and write to any database**.
- [ ] **Password in URI**: If your password has `@`, `#`, `:`, etc., URL-encode them (e.g. `@` → `%40`, `#` → `%23`).
- [ ] **`.env` location**: The file must be at `apps/backend/.env` (same folder as `package.json` of the backend). The backend loads it from there even when you run from the repo root.
- [ ] **No quotes**: In `.env` use `MONGO_URI=mongodb+srv://...` with no quotes around the value.

---

## 1. Create a MongoDB Atlas account

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Click **Try Free** and sign up (or sign in).

---

## 2. Create a cluster

1. After login, click **Build a Database** (or use an existing cluster).
2. Choose **M0 FREE** (shared) if you want the free tier.
3. Pick a **cloud provider and region** (e.g. AWS / region nearest to you).
4. Click **Create**.

---

## 3. Create a database user

1. In the left sidebar, go to **Database Access** → **Add New Database User**.
2. Choose **Password** authentication.
3. Set a **username** and **password**. Save the password somewhere safe.
4. Under **Database User Privileges**, leave **Read and write to any database** (or choose **Atlas admin** for full access).
5. Click **Add User**.

---

## 4. Allow network access

1. Go to **Network Access** → **Add IP Address**.
2. For local development, click **Allow Access from Anywhere** (adds `0.0.0.0/0`).  
   For production, add only your server’s IP.
3. Click **Confirm**.

---

## 5. Get your connection string

1. Go back to **Database** → **Connect** on your cluster.
2. Choose **Connect your application**.
3. Atlas shows something like:
   ```text
   mongodb+srv://YOUR_DB_USER:<db_password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
   ```
4. Build the full URI for this app:
   - Replace **`<db_password>`** with the password for that database user. If the password has `@`, `#`, `:`, etc., URL-encode them (e.g. `@` → `%40`, `#` → `%23`).
   - Add a **database name** before the `?`: use **`/voxvertex`** so the app has a dedicated database.  
     So change `...mongodb.net/?appName=...` to `...mongodb.net/voxvertex?retryWrites=true&w=majority` (you can keep or drop `appName=Cluster0`).
5. Final pattern:
   ```text
   mongodb+srv://YOUR_DB_USER:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/voxvertex?retryWrites=true&w=majority
   ```

Example (password `myp@ss` → `myp%40ss`):

```text
mongodb+srv://myuser:myp%40ss@cluster0.abc123.mongodb.net/voxvertex?retryWrites=true&w=majority
```

---

## 6. Configure the backend

1. In the backend folder, copy the example env file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and set:
   ```env
   MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/voxvertex?retryWrites=true&w=majority
   ```
3. Do **not** commit `.env` (it should be in `.gitignore`).

---

## 7. Run the backend

From the backend directory:

```bash
node src/index.js
```

Or, if you use a script that runs `src/index.js`:

```bash
npm run dev
```

You should see: **Connected to MongoDB**.

---

## 8. Test the business signup

1. Start the frontend (`npm run dev` in the frontend folder).
2. Open the app, click **Get Started Now** in the footer.
3. Fill and submit the form.
4. In Atlas: **Database** → **Browse Collections** → select your database → you should see a `businesssignups` collection with the new document.

---

## Troubleshooting

| Issue | What to do |
|--------|------------|
| **querySrv ECONNREFUSED** | Your network or DNS is blocking SRV lookups. The backend now auto-retries with a standard URI. If it still fails, in `.env` **replace** `mongodb+srv://` with `mongodb://`, and add `:27017` after the host (before the `/`). Example: `mongodb://USER:PASS@cluster0.xxxxx.mongodb.net:27017/voxvertex?ssl=true&authSource=admin&retryWrites=true&w=majority` |
| **Connection timeout** | In Atlas **Network Access**, add `0.0.0.0/0` for testing. |
| **Authentication failed** | Check username/password in `MONGO_URI`; URL-encode special characters in the password. |
| **Database not found** | Atlas creates the database on first write. Submit a signup and then refresh **Browse Collections**. |
| **Backend not running** | Ensure the backend is running on the port used by the frontend proxy (e.g. 5000). |
