const router = require('express').Router();
const NW = require('../functions/needleman-wunsch');
const excel = require('excel4node');
const fs = require('fs');

router.post('/', (req, res) => {
    var seq1 = JSON.stringify(req.body.data.seq1).slice(1).slice(0, -1).toUpperCase();
    var seq2 = JSON.stringify(req.body.data.seq2).slice(1).slice(0, -1).toUpperCase();

    /*Correções a fazer no algoritmo:
        A mesma célula da matriz tá com dois valores atribuídos a ela;
    */
    var results = NW(seq1, seq2);

    //inicio da criação do arquivo excel
    var workbook = new excel.Workbook();
    var worksheet = workbook.addWorksheet('Sequence alignment');

    seq1 = seq1.split('');
    seq2 = seq2.split('');

    for(var i = 0; i < seq1.length; i++) {
        worksheet.cell(1, i+3)
          .string(seq1[i]);
    }

    for(var j = 0; j < seq2.length; j++) {
        worksheet.cell(j+3, 1)
          .string(seq2[j]);
    }

    for(var k = 0; k < Object.keys(results.alignMatrix).length; k++) {
        for(var l = 0; l < Object.keys(results.alignMatrix[0]).length; l++) {
            worksheet.cell(l+2, k+2)
            .number(results.alignMatrix[k][l])   
            .style({
                border: {
                    left: { style: 'thin' }, 
                    right: { style: 'thin' },
                    top: { style: 'thin' }, 
                    bottom: { style: 'thin' }
                }
            });
        }
    }

    workbook.write('aligned_sequences.xlsx');
    //fim da função de geração do arquivo .xlsx

    fs = fs.readdirSync('./result-sheets/');
    

    res.status("200");
    return res.send("rodamo");
});

module.exports = router;