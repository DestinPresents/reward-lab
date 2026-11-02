# RewardLab Free Firebase Setup (Hindi)

Aapka Firebase Spark/free plan Cloud Functions nahi chalata. Is build me Functions use hi nahi hote.

## Pehle ye set karein

1. `firebase-config.js` kholen aur Firebase Console → Project settings → Your apps se Web config paste karein.
2. `app-settings.js` me `REPLACE_WITH_YOUR_GOOGLE_EMAIL` ko apne admin Google email se replace karein.
3. `firestore.rules` me bhi `isAdmin()` ke andar wahi email replace karein. Dono jagah email same hona chahiye.
4. Firebase Console → Authentication → Sign-in method → Google ko Enable karein.
5. Firebase Console → Firestore Database → Rules tab kholen. `firestore.rules` ka poora content paste karke **Publish** karein.
6. Hosting ke liye is ZIP ke `RewardLab` folder ke files deploy karein. Agar Firebase CLI available hai to project folder me:

```bash
firebase login
firebase use --add
firebase deploy --only firestore:rules,firestore:indexes,hosting
```

Is build me **Functions tab kholne, Blaze upgrade karne, service-account key banane, ya `registerUser` deploy karne ki zaroorat nahi hai**.

## Agar login ke baad permission-denied aaye

- `firebase-config.js` ka `projectId` wahi ho jahan Firestore Rules publish kiye hain.
- Google provider enabled ho.
- Admin email `app-settings.js` aur `firestore.rules` dono me same ho.
- Rules publish hone ke baad page refresh karke dobara Google sign-in karein.

## Testing limitation

Credits, referral bonuses, deposit aur withdrawal sab non-cash testing values hain. Spark version me ye logic browser se run hota hai; isliye user browser tools se apne testing credits manipulate kar sakta hai. Isse public users ke liye share na karein aur real payments/payouts se kabhi connect na karein. Public/real-money service ke liye trusted backend chahiye.
