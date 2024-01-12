// Button Status
const buttonsStatus = document.querySelectorAll("[button-status]");
// console.log(buttonsStatus);
if(buttonsStatus.length > 0) {
    let url = new URL(window.location.href);
    console.log(url);

    buttonsStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            // console.log(status);
            if(status) {
                url.searchParams.set("status", status)
            } else {
                url.searchParams.delete("status");
            }
            
            // console.log(url.href);
            window.location.href = url.href
        })
    })
}
//End Button Status
