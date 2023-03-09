import axios from "axios";  
  
export async function downloadPdf(url, setState) {
    const response = await axios.get(url, { responseType: 'blob' });
    if (response.data.error) {
        setState(response.data.error);
    }
    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    const fileLink = document.createElement('a');
    fileLink.href = fileURL;
    const fileName = response.headers['content-disposition'].substring(22, 52);
    fileLink.setAttribute('download', fileName);
    fileLink.setAttribute('target', '_blank');
    document.body.appendChild(fileLink);
    fileLink.click();
    fileLink.remove();
}