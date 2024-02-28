// Button Change Status

const buttonsChangeStatus = document.querySelectorAll("[button-change-status]")
// console.log(buttonsChangeStatus);
if(buttonsChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-path")

    buttonsChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            const statusCurrent = button.getAttribute("data-status")

            console.log(id);
            console.log(statusCurrent);

            let statusChange = statusCurrent == "active" ? "inactive" : "active"

            const action = path + `/${statusChange}/${id}?_method=PATCH`

            formChangeStatus.action = action;

            formChangeStatus.submit();
        })
    })
}


// End Button Change Status

// Checkbox Multi

const checkboxMulti = document.querySelector("[checkbox-multi]");
// console.log(checkboxMulti);
if(checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']")
    
    // console.log(inputCheckAll);
    // console.log(inputsId);

    inputCheckAll.addEventListener("click", () => {
        if(inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true;   
            })
        } else {
            inputsId.forEach(input => {
                input.checked = false;   
            })
        }
    })

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length ;
            
            // console.log(countChecked);
            // console.log(inputsId.length);

            if(countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            } else {
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
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
        
        if(inputsChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");

            inputsChecked.forEach(input => {
                const id = input.value;
                ids.push(id)
            })

            // console.log(ids.join(", "));

            inputIds.value = ids.join(", ");

            formChangeMulti.submit();

            // console.log(ids);
        } else {
            alert("Vui lòng chọn ít nhất một bản ghi!")
        }


    })

}

// End Form Change Multi



// Delete Item

const buttonsDelete = document.querySelectorAll("[button-delete]");
if(buttonsDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item")
    const path =  formDeleteItem.getAttribute("data-path")

    buttonsDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?");

            if(isConfirm) {
                const id = button.getAttribute("data-id");

                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;

                formDeleteItem.submit();
            }
        })
    })
}

// End Delete Item

