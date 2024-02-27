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

