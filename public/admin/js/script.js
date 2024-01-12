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


// Form Search

const formSearch = document.querySelector("#form-search");
if(formSearch) {
    let url = new URL(window.location.href)
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if(keyword) {
            url.searchParams.set("keyword", keyword)
        } else {
            url.searchParams.delete("keyword")
        }

        window.location.href = url.href
    })
}

// End Form Search

