$(function () {

    $('header, footer').attr('data-html2canvas-ignore', true);

    function exportToPDF(quality = 1, name = 'Report') {
        const filename  = name + '.pdf';

        html2canvas(document.querySelector('body'),
            {scale: quality}
        ).then(canvas => {
            let pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
            pdf.save(filename);
        });
    }

    exportToPDF(window.devicePixelRatio, $('#report-title').text().trim());
});
