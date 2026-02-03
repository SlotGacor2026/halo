// ----- WALLET JS -----
// Simpan pemain saat login/daftar
function saveCurrentPlayer(player){
  let players = JSON.parse(localStorage.getItem('players')) || [];
  const index = players.findIndex(p=>p.username===player.username);
  if(index>=0) players[index]=player;
  else players.push(player);
  localStorage.setItem('players', JSON.stringify(players));
  localStorage.setItem('currentPlayer', JSON.stringify(player));
}

// Tambah deposit
function addDeposit(amount){
  const player = JSON.parse(localStorage.getItem('currentPlayer'))||{};
  player.pendingDeposit = (player.pendingDeposit||0)+amount;
  saveCurrentPlayer(player);

  // Simpan ke history
  const history = JSON.parse(localStorage.getItem('history'))||[];
  history.push({type:'Deposit', amount, date:new Date().toLocaleString(), user:player.username, acc:false});
  localStorage.setItem('history', JSON.stringify(history));
}

// Tambah withdraw
function addWithdraw(amount){
  const player = JSON.parse(localStorage.getItem('currentPlayer'))||{};
  if(amount>(player.saldo||0)){ alert("Saldo tidak cukup!"); return; }
  player.pendingWithdraw = (player.pendingWithdraw||0)+amount;
  saveCurrentPlayer(player);

  // Simpan ke history
  const history = JSON.parse(localStorage.getItem('history'))||[];
  history.push({type:'Withdraw', amount, date:new Date().toLocaleString(), user:player.username, acc:false});
  localStorage.setItem('history', JSON.stringify(history));
}

// Format ribuan
function formatNumber(num){ return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,"."); }
