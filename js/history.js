function showHistory(){
  const u=auth.currentUser;
  if(!u) return;
  db.collection("history").where("uid","==",u.uid)
  .get().then(s=>{
    panel.innerHTML="<h3>Histori</h3>";
    s.forEach(d=>panel.innerHTML+=`<div>${d.data().text}</div>`);
  });
}
function showLeaderboard(){
  db.collection("users").orderBy("balance","desc").limit(10)
  .get().then(s=>{
    panel.innerHTML="<h3>Leaderboard</h3>";
    s.forEach(d=>panel.innerHTML+=`<div>${d.id} : ${d.data().balance}</div>`);
  });
}
