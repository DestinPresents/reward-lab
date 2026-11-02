# RewardLab — Spark/free-plan build

This version is designed for Firebase's **Spark (free) plan**. It uses Google Authentication, Cloud Firestore and Firebase Hosting only. It does **not** call Cloud Functions, Cloud Run or require a Blaze upgrade.

## Important limitation

Because Spark has no trusted server-side Cloud Functions, the testing-credit logic runs in the browser. This is suitable only for private UI/workflow testing with nonredeemable credits. A technically capable user could manipulate client-side balances/referrals. Do not publish this build for public use, do not connect UPI/bank payments, and never use it for real-money deposits or withdrawals. For a secure public service, a trusted backend is required.

## Included

- Responsive RewardLab pages: Overview, Wallet, Games, Refer & Earn, Profile.
- Google-only sign-in.
- Five-digit member code stored in Firestore, signup credit 50, referral credit 10.
- Testing-credit deposit buttons (100/200/300/500/1000), withdrawal eligibility checks, transaction history and admin withdrawal review.
- Admin Console: user list/search, profile and balance editing, disable/enable in RewardLab, transaction/referral history, audit log.
- No Cloud Functions, no service account key, no billing upgrade required for Functions.

## Setup (phone-friendly where possible)

1. Open Firebase Console and create/select your project.
2. In **Authentication → Sign-in method**, enable **Google**. Add your Hosting domain in Authorized domains if needed.
3. Create **Cloud Firestore** in test/production mode, then deploy the provided rules immediately.
4. In **Project settings → Your apps**, copy the Web app config into `firebase-config.js`, replacing all `REPLACE_ME` values.
5. Open `app-settings.js` and replace `REPLACE_WITH_YOUR_GOOGLE_EMAIL` with the exact Google email you will use as the admin.
6. Open `firestore.rules` and replace the same placeholder with that exact email (inside the quoted string in `isAdmin()`). Save.
7. Deploy **only Firestore Rules, Firestore indexes and Hosting**:

```bash
npm install -g firebase-tools
firebase login
firebase use --add
firebase deploy --only firestore:rules,firestore:indexes,hosting
```

There is intentionally no `functions` deployment target in this ZIP.

8. Open your Hosting URL `/index.html`, sign in with Google, and open `/admin.html` using the email configured above.

## Rules

- Signup grants 50 testing credits.
- Referral signup attempts to award the referrer 10 credits once.
- Credit deposits are simulated only; they do not charge anyone.
- Withdrawal request minimum is 200 credits and requires at least 100 prior testing credits. Cancelled requests return the reserved credits; approved requests only update the testing status.
- Games are placeholders and have no gameplay or wagering.

## Troubleshooting

- If login says `permission-denied`, confirm Firestore Rules were deployed and the admin email placeholder was replaced in both files.
- If Google login fails, enable Google provider and add the hosting domain to Authorized domains.
- Do not open the HTML through `file://`; use Firebase Hosting or a local web server.
- The free-plan build intentionally avoids Functions. Do not re-add `getFunctions()` or callable function requests, or the original setup error will return.
- Existing records from the Functions version are not deleted. The same Firestore data layout is reused, but existing user documents should be checked if they were partially created by the earlier build.
