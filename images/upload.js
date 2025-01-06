// upload.js

function uploadPost() {
    var title = document.getElementById("title").value;
    var content = document.getElementById("content").value;
    var image = document.getElementById("image").files[0];

    var formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "process_post.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                // Assuming the response from the server is the URL of the uploaded image
                var imageUrl = xhr.responseText;

                // Send the image URL to the parent window (index.html)
                window.parent.postMessage({ imageUrl: imageUrl }, "*");
            } else {
                console.error("Error uploading image.");
            }
        }
    };
    xhr.send(formData);
}

var submitButton = document.querySelector("#upload-button");
submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    uploadPost();
});
