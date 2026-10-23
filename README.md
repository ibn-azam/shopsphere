This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Authentication (Firebase)

ShopSphere uses the Firebase JS SDK for email/password and Google sign-in. User
state is provided to the whole app by `AuthProvider` in `src/context/AuthContext.jsx`,
and the navbar reflects the signed-in user.

### 1. Create a Firebase project

1. Open the [Firebase console](https://console.firebase.google.com/) and create a project.
2. Add a **Web app** in Project settings → General → Your apps.
3. Copy the SDK config values.

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

```dotenv
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

Restart the dev server after changing env values.

### 3. Enable sign-in methods

In the Firebase console go to **Authentication → Sign-in method** and enable:

- **Email/Password** (required)
- **Google** (optional)

For Google, also add your site to **Authentication → Settings → Authorized
domains** (for local development, `localhost` is allowed by default).

### 4. Use it

- `/signup` — create an account with email/password or Google
- `/login` — sign in and get redirected to `/`
- The navbar shows the signed-in user and a **Sign out** action

If the environment variables are missing, the auth pages render a clear
"Firebase is not configured" notice instead of crashing.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
