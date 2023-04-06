export const readableDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return date.getDate() + ' ' + month[date.getMonth()+1] + ' ' + date.getFullYear();
}

export const StoreToLocalStorage = (dataToStore, storageKey) => {
    const storedData = localStorage.getItem(storageKey);
    if (storedData) {
        let parsedData = JSON.parse(storedData);
        parsedData = {...parsedData, ...dataToStore};
        localStorage.setItem(storageKey, JSON.stringify(parsedData));
    } else {
        localStorage.setItem(storageKey, JSON.stringify(dataToStore));
    }
}

export const ConvertB64toFormData = (base64Img) => {
    var block = base64Img.split(";");
    // Get the content type of the image        
    var contentType = block[0].split(":")[1];   // In this case "image/gif"

    // get the real base64 content of the file
    var realData = block[1].split(",")[1]; 

    // Convert it to a blob to upload
    var blob = B64toBlob(realData, contentType);

    // Create a FormData and append the file with "image" as parameter name
    var formDataToUpload = new FormData();
    formDataToUpload.append("file", blob);
    return formDataToUpload;
}

const B64toBlob = (b64Data, contentType, sliceSize) => {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}