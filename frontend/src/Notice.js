
// ---------- Start of component
// ----------- Export child Component
export const errorMessage = function(){
    let notice = document.getElementsByClassName("notice")[0]
    notice.style.display = "block";
    notice.innerHTML = "No data was returned. Try again or try using compatible browsers like Firefox or Safari.";
}
