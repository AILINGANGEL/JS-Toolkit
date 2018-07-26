exportToExcel(filename, htmls) {
    var uri = 'data:application/vnd.ms-excel;base64,';
    var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta name=ProgId content=Excel.Sheet> <meta name=Generator content="Microsoft Excel 11"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';

    //将字符串转换成base64编码
    var base64 = function(s) {
        return window.btoa(unescape(encodeURIComponent(s)))
    };


    //将template中的{worksheet}和{table}都用ctx中对应的值替换掉
    var format = function(s, c) {
        return s.replace(/{(\w+)}/g, function(m, p) {
            return c[p];
        })
    };
    var ctx = {
        worksheet: 'Worksheet',
        table: htmls
    }
    var link = document.createElement("a");
    link.download = filename + '.xls';
    link.href = uri + base64(format(template, ctx));
    link.click();
}

genTableStr(header, data) {
    var strHeader = '<thead><tr>';
    var thStr = '';
    header.forEach((item) => {
        if (item.key) {
            thStr += ('<th>' + item.title + '</th>');
        }
    });
    strHeader += (thStr + '</tr></thead>');
    var strBody = '<tbody>' + data.map((item) => {
        let itemStr = '<tr>';
        let tdStr = '';
        header.forEach((h) => {
            if (h.key) {
                let tdData = item[h.key];
                let tdDataStr;
                if (Array.isArray(tdData)) {
                    tdDataStr = tdData.join(';')
                } else if (typeof tdData === 'object') {
                    console.log('here')
                    if (Object.keys(tdData).length > 0) {
                        tdDataStr = JSON.stringify(tdData);
                    } else {
                        tdDataStr = '';
                    }
                } else {
                    tdDataStr = tdData;
                }
                tdStr += ('<td>' + tdDataStr + '</td>');
            }
        });
        itemStr += (tdStr + '</tr>');
        return itemStr;
    }).join('') + '</tbody>';
    return `<table>${strHeader}${strBody}</table>`;
}