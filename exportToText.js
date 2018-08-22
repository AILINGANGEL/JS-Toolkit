exportToText(filename, text) {
    let link = document.createElement("a");
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    link.setAttribute('download', filename);
    link.click();
}