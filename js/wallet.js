// Deposit / Withdraw Request
function sendDepositRequest(){
  let no = document.getElementById("depositNo").value;
  let type = document.getElementById("depositType").value;
  let username = localStorage.getItem("currentUser");
  if(!username) return alert("Login dulu");
  if(!no || !type) return alert("Lengkapi data");
  let users = JSON.parse(localStorage.getItem("users")||"{}");
  let coin = parseInt(prompt("Jumlah Coin Deposit:"));
  let requests = JSON.parse(localStorage.getItem("pendingRequests")||"[]");
  requests.push({username,type,no,coin:reqCoin, type:"deposit"});
  localStorage.setItem("pendingRequests",JSON.stringify(requests));
  alert("Deposit terkirim, tunggu ACC bandar");
  hideDeposit();
}

function sendWithdrawRequest(){
  let no = document.getElementById("withdrawNo").value;
  let type = document.getElementById("withdrawType").value;
  let username = localStorage.getItem("currentUser");
  if(!username) return alert("Login dulu");
  let coin = parseInt(prompt("Jumlah Coin Withdraw:"));
  let requests = JSON.parse(localStorage.getItem("pendingRequests")||"[]");
  requests.push({username,type,no,coin,type:"withdraw"});
  localStorage.setItem("pendingRequests",JSON.stringify(requests));
  alert("Withdraw terkirim, tunggu ACC bandar");
  hideWithdraw();
}

// Deposit / Withdraw hide/show
function showDeposit(){document.getElementById("depositSection").style.display="block";}
function hideDeposit(){document.getElementById("depositSection").style.display="none";}
function showWithdraw(){document.getElementById("withdrawSection").style.display="block";}
function hideWithdraw(){document.getElementById("withdrawSection").style.display="none";}
