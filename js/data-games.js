const GAMES=[];
for(let i=1;i<=220;i++){
  GAMES.push({
    id:i,
    name:`Slot ${i}`,
    provider:i%2===0?'PGSoft':'Pragmatic',
    img:`slot${i}.jpg`
  });
    }
