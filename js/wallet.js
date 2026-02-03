// ======= STORAGE HELPERS =======
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function setUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser") || "null");
}

function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

// ======= LOGIN / REGISTER =======
function registerUser(form) {
  const users = getUsers();
  if(users.some(u => u.username === form.username.value)) {
    return alert("Username sudah digunakan!");
  }
  const newUser = {
    username: form.username.value,
    password: form.password.value,
    email: form.email.value,
    ewallet: form.ewallet.value,
    ewalletNumber: form.ewalletNumber.value,
    bank: form.bank.value,
    bankNumber: form.bankNumber.value,
    saldo: 0,
    referral: form.referral.value || ""
  };
  users.push(newUser);
  setUsers(users);
  setCurrentUser(newUser);
  alert("Registrasi berhasil!");
}

function loginUser(username, password) {
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if(!user) return alert("Username atau password salah!");
  setCurrentUser(user);
  alert("Login berhasil!");
}

// ======= DEPOSIT =======
function depositUI() {
  const user = getCurrentUser();
  if(!user) return alert("Login dulu!");

  const depositForm = document.createElement("div");
  depositForm.className = "modal";
  depositForm.innerHTML = `
    <h3>Deposit</h3>
    <label>Rekening Kamu (e-wallet/bank terdaftar)</label>
    <input type="text" id="rekUser" value="${user.ewalletNumber || user.bankNumber || ''}" readonly />

    <label>Nomor Tujuan</label>
    <input type="text" id="rekTujuan" placeholder="Masukkan nomor tujuan" />

    <label>Pilih Opsi</label>
    <select id="depositOpsi">
      <option value="ewallet" ${user.ewalletNumber ? "selected" : ""}>E-wallet (${user.ewallet || ''})</option>
      <option value="bank" ${user.bankNumber ? "selected" : ""}>Bank (${user.bank || ''})</option>
    </select>

    <div class="actions">
      <button id="cancelDeposit">Batal</button>
      <button id="confirmDeposit">Konfirmasi</button>
    </div>

    <div id="depositLoading" style="display:none">Proses deposit...</div>
  `;

  document.body.appendChild(depositForm);

  document.getElementById("cancelDeposit").onclick = ()=> depositForm.remove();

  document.getElementById("confirmDeposit").onclick = ()=>{
    const tujuan = document.getElementById("rekTujuan").value.trim();
    const opsi = document.getElementById("depositOpsi").value;

    if(!tujuan) return alert("Masukkan nomor tujuan!");
    const registered = user.ewalletNumber || user.bankNumber;
    if(registered && tujuan !== registered) {
      return alert("Tidak bisa deposit lewat rekening lain selain yang terdaftar!");
    }

    const loading = document.getElementById("depositLoading");
    loading.style.display = "block";

    const delay = Math.floor(Math.random() * 10000) + 1000;
    setTimeout(()=>{
      loading.style.display = "none";

      let users = getUsers();
      const index = users.findIndex(u => u.username === user.username);
      if(index >= 0){
        const amount = parseInt(prompt("Masukkan jumlah deposit:"));
        if(!amount || amount <= 0) return alert("Jumlah tidak valid!");
        users[index].saldo = (users[index].saldo || 0) + amount;
        setUsers(users);
        setCurrentUser(users[index]);
        alert("Deposit berhasil! Saldo sekarang: " + users[index].saldo);
        depositForm.remove();
      }
    }, delay);
  }
}

// ======= WITHDRAW =======
function withdrawUI() {
  const user = getCurrentUser();
  if(!user) return alert("Login dulu!");

  const withdrawForm = document.createElement("div");
  withdrawForm.className = "modal";
  withdrawForm.innerHTML = `
    <h3>Withdraw</h3>
    <p>Saldo Kamu: ${user.saldo || 0}</p>
    <label>Jumlah Withdraw</label>
    <input type="number" id="withdrawAmount" placeholder="Masukkan jumlah" />
    <div class="actions">
      <button id="cancelWithdraw">Batal</button>
      <button id="confirmWithdraw">Konfirmasi</button>
    </div>
  `;
  document.body.appendChild(withdrawForm);

  document.getElementById("cancelWithdraw").onclick = ()=> withdrawForm.remove();

  document.getElementById("confirmWithdraw").onclick = ()=>{
    const amount = parseInt(document.getElementById("withdrawAmount").value);
    if(!amount || amount <= 0) return alert("Jumlah tidak valid!");
    if(amount > user.saldo) return alert("Saldo tidak cukup!");
    
    let users = getUsers();
    const index = users.findIndex(u => u.username === user.username);
    if(index >=0){
      users[index].saldo -= amount;
      setUsers(users);
      setCurrentUser(users[index]);
      alert("Withdraw berhasil! Saldo sekarang: " + users[index].saldo);
      withdrawForm.remove();
    }
  }
}

// ======= SHOW HISTORY & LEADERBOARD (contoh sementara) =======
function showHistory() { alert("History belum diimplementasi"); }
function showLeaderboard() { alert("Leaderboard belum diimplementasi"); }

// ======= LOGOUT =======
function logout() {
  localStorage.removeItem("currentUser");
  alert("Logout berhasil!");
  location.reload();
}
