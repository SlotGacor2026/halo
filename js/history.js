// ----- HISTORI & LEADERBOARD -----
function showHistory(){
  document.getElementById('historyPanel').style.display='block';
  document.getElementById('leaderboardPanel').style.display='none';
  const history = JSON.parse(localStorage.getItem('history'))||[];
  const player = JSON.parse(localStorage.getItem('currentPlayer'))||{};
  const list = document.getElementById('historyList');
  list.innerHTML='';

  history.filter(h=>h.user===player.username)
         .forEach(h=>{
           const li=document.createElement('li');
           li.textContent=`${h.date} - ${h.type}: ${formatNumber(h.amount)} ${h.acc?'✔':'⏳'}`;
           list.appendChild(li);
         });
}

function showLeaderboard(){
  document.getElementById('leaderboardPanel').style.display='block';
  document.getElementById('historyPanel').style.display='none';
  const history = JSON.parse(localStorage.getItem('history'))||[];
  const leaderboard = {};

  history.forEach(h=>{
    if(!leaderboard[h.user]) leaderboard[h.user]=0;
    if(h.acc) leaderboard[h.user]+=h.amount;
  });

  const sorted = Object.entries(leaderboard).sort((a,b)=>b[1]-a[1]);
  const list = document.getElementById('leaderboardList');
  list.innerHTML='';
  sorted.forEach(([user,total])=>{
    const li=document.createElement('li');
    li.textContent=`${user}: ${formatNumber(total)}`;
    list.appendChild(li);
  });
                  }
