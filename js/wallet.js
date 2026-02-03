auth.onAuthStateChanged(user=>{
  const box=document.getElementById('authBox');
  if(!box) return;
  if(!user){
    box.innerHTML=`
      <input id="u" placeholder="Username">
      <input id="p" type="password" placeholder="Password">
      <button onclick="login()">Login / Register</button>`;
  }else{
    box.innerHTML=`👤 ${user.email} <button onclick="logout()">Logout</button>`;
  }
});

function login(){
  const e=document.getElementById('u').value+"@fanzz777.com";
  const p=document.getElementById('p').value;
  auth.signInWithEmailAndPassword(e,p)
  .catch(()=>auth.createUserWithEmailAndPassword(e,p)
    .then(u=>db.collection("users").doc(u.user.uid).set({balance:0})));
}
function logout(){ auth.signOut(); }
function deposit(){
  const u=auth.currentUser;
  if(!u) return alert("Login dulu");
  db.doc(`users/${u.uid}`).update({
    balance:firebase.firestore.FieldValue.increment(1000)
  });
}
function withdraw(){
  const u=auth.currentUser;
  if(!u) return;
  db.doc(`users/${u.uid}`).update({
    balance:firebase.firestore.FieldValue.increment(-500)
  });
}
function spin(){
  const u=auth.currentUser;
  if(!u) return alert("Login dulu");
  db.doc(`users/${u.uid}`).update({
    balance:firebase.firestore.FieldValue.increment(Math.floor(Math.random()*300))
  });
     }
