const WA_NUMBER="972524332333";
const GENERIC="היי, הגעתי דרך אתר FleetOps ואני רוצה לשמוע פרטים לגבי פתרון למשלוחים גדולים.";

function waUrl(text){
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

document.querySelectorAll(".generic-wa").forEach(a=>{
  a.href=waUrl(GENERIC);
  a.target="_blank";
  a.rel="noopener";
});

document.getElementById("waForm").addEventListener("submit",function(e){
  e.preventDefault();
  const name=document.getElementById("name").value.trim();
  const company=document.getElementById("company").value.trim();
  const phone=document.getElementById("phone").value.trim();
  const message=document.getElementById("message").value.trim();

  const text=`היי, הגעתי דרך אתר FleetOps ואני רוצה לשמוע פרטים לגבי פתרון למשלוחים גדולים.

שם: ${name}
חברה: ${company || "לא צוין"}
טלפון: ${phone}
הצורך שלנו: ${message || "אשמח לקבל פרטים נוספים"}`;

  window.open(waUrl(text),"_blank","noopener");
});