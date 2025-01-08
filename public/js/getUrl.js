export const getUrl = async (url) => {
    let content = document.getElementById('content');
    let res = await fetch('/url', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ videoUrl: url})
    })

    let {nowm, wm, music} = await res.json();

    const response = await fetch(nowm);
    if (!response.ok) {
        throw new Error('Failed to fetch video');
    }
    const blob = await response.blob();

    // Create a temporary URL for the blob
    const blobUrl = URL.createObjectURL(blob);

    // Create an anchor element
    const a = document.createElement('a');
    a.href = blobUrl;

    // Set the download attribute with the desired file name
    a.download = `${nowm}.mp4` || 'video.mp4';
    // Append the anchor to the body (required for Firefox)
    document.body.appendChild(a);

    // Programmatically click the anchor to trigger the download
    a.click();

    // Clean up: Remove the anchor and revoke the blob URL
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
    // Set the download attribute with the desired file name


    // agregamos la etiqueta video...
    let buttons = `
        <a href="${music}" target='_blank' class='btn'>download audio</a>
    `;
    let video = `
        <video controls="" autoplay="" name="media">
            <source src="${nowm}" type="video/mp4"></source>
        </video>
    `;
    content.innerHTML = `${buttons} ${video}`;
       
}
