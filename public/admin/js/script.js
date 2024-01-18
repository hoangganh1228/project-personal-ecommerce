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

// Pagination

const buttonPagination = document.querySelectorAll("[button-pagination]");
if(buttonPagination) {
    let url = new URL(window.location.href);
    buttonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");

            url.searchParams.set("page", page);

            window.location.href = url.href
        })
    })
}



// End Pagination

// Checkbox Multi

const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti) {
    // console.log(checkboxMulti);
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    console.log(inputCheckAll);
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']")
    // console.log(inputsId);
    inputCheckAll.addEventListener("click", () => {
        if(inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true
            })
        } else {
            inputsId.forEach(input => {
                input.checked = false;
            }) 
        }
    })

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll(
                "input[name='id']:checked"
            ).length;
            // console.log(countChecked);
            
            if(countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            }
            else {
                inputCheckAll.checked = false;

            }
        })
    })
}
// End Checkbox Multi


// Form Change Multi

const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputChecked = checkboxMulti.querySelectorAll(
            "input[name='id']:checked"
        );
        
        // console.log(inputChecked);
        if(inputChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']")
            
            inputChecked.forEach(input => {
                const id = input.value;
                ids.push(id)
            })

            inputIds.value = ids.join(", ")
        
            formChangeMulti.submit();
        }
        else {
            alert("Vui lòng chọn ít nhất một bản ghi!")
        }
    })
}

// End Form Change Multi



