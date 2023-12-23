const textArea = document.getElementById("text_to_summarize")
const submitButton = document.getElementById("submit-button")
const summarizedTextArea = document.getElementById("summary")
textArea.addEventListener("input", verifyTextLength)
submitButton.addEventListener("click", submitData)
submitButton.disabled = true;
function verifyTextLength(e) {
    const textArea = e.target;
    if (textArea.value.length >= 200 && textArea.value.length <= 100000)
        submitButton.disabled = false;
    else
        submitButton.disabled = true;
}
function submitData(e) {
    submitButton.classList.add("submit-button--loading");
    const text_to_summarize = textArea.value;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "text_to_summarize": text_to_summarize
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch('/sum', requestOptions)
        .then(response => response.text())
        .then(summary => {
            console.log(summary);
            summarizedTextArea.value = summary;
            submitButton.classList.remove("submit-button--loading");
        })
        .catch(error => {
            console.log(error.message);
        });
}
