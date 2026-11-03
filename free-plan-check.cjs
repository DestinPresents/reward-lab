const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');const admin=fs.readFileSync(path.join(root,'admin.js'),'utf8');const cfg=fs.readFileSync(path.join(root,'firebase.json'),'utf8');const rules=fs.readFileSync(path.join(root,'firestore.rules'),'utf8');const settings=fs.readFileSync(path.join(root,'app-settings.js'),'utf8');
assert(!app.includes('firebase-functions.js'),'member app must not import Cloud Functions');
assert(!admin.includes('firebase-functions.js'),'admin app must not import Cloud Functions');
assert(!cfg.includes('"functions"'),'firebase.json must not define Functions deployment');
assert(app.includes('runTransaction')&&app.includes('signup bonus'),'signup and credit flows should use Firestore transactions');
assert(app.includes('balance:50')&&app.includes('amount:10'),'signup/referral amounts should be present');
assert(admin.includes('withdrawalDecision')&&admin.includes('editUser'),'admin decisions and audit trail should be present');
assert(rules.includes('function isAdmin()')&&rules.includes("request.auth.token.email == 'adityasinghworks1612@gmail.com'"),'Firestore Rules must allow only the configured admin email');
assert(settings.includes("adminEmail = 'adityasinghworks1612@gmail.com'"),'app-settings.js must use the configured admin email');
assert(!app.includes('async function depositCredits('),'member app must not contain a client-side deposit-credit mutation');
assert(!app.includes("btn('+'+fmt(n),'deposit:'"),'wallet must not show self-serve deposit buttons');
assert(app.includes('Deposits are disabled until real payment verification is integrated.'),'stale deposit actions must fail closed');
assert(!rules.includes("request.resource.data.type == 'deposit'")&&!rules.includes("getAfter(txPath).data.type == 'deposit'"),'Firestore Rules must reject user-created deposit transactions');
assert(!fs.existsSync(path.join(root,'functions')),'Spark package should not include a Cloud Functions deployment folder');

console.log('PASS: Spark-only architecture, admin email allowlist, disabled self-serve deposits, and preserved signup/referral/admin flows.');
