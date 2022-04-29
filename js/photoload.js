var albumname = decodeURI(document.location.search.split("=")[1])

function showmodal(id) {
    $("#" + id).modal('toggle')
}

function addRow(name, value) {
    var row = document.createElement("tr")
    var name_cell = document.createElement("td")
    name_cell.innerHTML = name
    name_cell.classList.add("font-weight-bold", "text-gray")
    row.appendChild(name_cell)
    var value_cell = document.createElement("td")
    value_cell.innerHTML = value
    row.appendChild(value_cell)
    return row
}

var req = new XMLHttpRequest();
req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var photos = JSON.parse(req.responseText)["photos"]

        document.getElementById("title").innerHTML = albumname

        for (photo in photos) {
            var img = document.createElement("img")
            img.src = photos[photo]["path"]
            img.classList.add("photo")
            img.setAttribute("data-target-id", photo)
            img.addEventListener("click", function() {
                showmodal(this.getAttribute("data-target-id"))
            })

            document.getElementById("images").appendChild(img)

            var modal = document.createElement("div")
            modal.classList.add("modal", "fade")
            modal.setAttribute("id", photo.toString())
            modal.setAttribute("role", "dialog")

            var modal_dialog = document.createElement("div")
            modal_dialog.classList.add("modal-dialog", "modal-dialog-centered")
            modal_dialog.setAttribute("role", "document")
            modal.appendChild(modal_dialog)

            var modal_content = document.createElement("div")
            modal_content.classList.add("modal-content")
            modal_dialog.appendChild(modal_content)

            var modal_body = document.createElement("div")
            modal_body.classList.add("modal-body")
            modal_content.appendChild(modal_body)

            var image = document.createElement("img")
            image.src = photos[photo]["path"]
            image.classList.add("img-fluid")
            modal_body.appendChild(image)

            var table = document.createElement("table")
            table.classList.add("table", "table-sm")
            table.appendChild(addRow("Description", photos[photo]["desc"]))
            table.appendChild(addRow("Date", photos[photo]["date"]))
            table.appendChild(addRow("Shutter speed", photos[photo]["shutterspeed"]))
            table.appendChild(addRow("ISO", photos[photo]["iso"]))
            table.appendChild(addRow("Focal length", photos[photo]["focus"]))
            table.appendChild(addRow("Aperture", photos[photo]["aperture"]))
            table.appendChild(addRow("Camera", photos[photo]["camera"]))
            table.appendChild(addRow("Copyright", "No image can be used without permission of NikiTricky."))
            modal_body.appendChild(table)

            document.getElementById("modals").appendChild(modal)
        }
    }
};
req.open("GET", `/assets/images/photos/${albumname}/metadata.json`, true);
req.send();