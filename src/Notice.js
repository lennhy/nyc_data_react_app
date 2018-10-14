
// ---------- Start of component
// ----------- Export child Component
export const errorMessage = function(){
    let notice = document.getElementsByClassName("notice")[0]
    notice.style.display = "block";
    notice.innerHTML = "Something went wrong. Please try again!";
}
