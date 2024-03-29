const UP = 1;
const LEFT = 2;
const UPLEFT = 4;

const MATCH = 1;
const MISMATCH = -1;
const GAP = 2;

// Fonte: https://gist.github.com/shinout/f19da7720d130f3925ac
function NeedlemanWunsch (seq1, seq2) {
    //alignMatrix guarda a pontuação, directionMatrix guarda a direção
    var alignMatrix = {};
    var directionMatrix = {};

    var numMatches = 0;
    var numMisMatches = 0;
    var numGaps = 0;
    
    console.log("************************")
    //Inicializando as matrizes
    console.time("Inicialização da matriz");
    for(var i = 0; i < seq1.length+1; i++) {
        alignMatrix[i] = {0:0};
        directionMatrix[i] = {0:[]};

        for(var j = 1; j < seq2.length+1; j++) {
            if(alignMatrix[i][j] = (i == 0)) {
                0;
            } else {
                if ((seq1.charAt(i-1) == seq2.charAt(j-1))) {
                    MATCH
                } else {
                    MISMATCH
                }
            }
            // alignMatrix[i][j] = (i == 0) ? 0 : (seq1.charAt(i-1) == seq2.charAt(j-1)) ? MATCH : MISMATCH 
            directionMatrix[i][j] = [];
        }
    }
    console.timeEnd("Inicialização da matriz");
    
    //Calculando o alinhamento das sequências
    console.time("Cálculo do alinhamento");
    for(var i = 0; i < seq1.length+1; i++) {
        for(var j = 0; j < seq2.length+1; j++) {
            // Se usar if else normal, o resto do algoritmo quebra
            var newValue = (i == 0 || j == 0)
            ? -GAP * (i + j)
            : Math.max(alignMatrix[i-1][j] - GAP, alignMatrix[i-1][j-1] + alignMatrix[i][j], alignMatrix[i][j-1] - GAP);

            //Definindo a direção do alinhamento II adicionar umm else 
            if (i > 0 && j > 0) {
                if (newValue == alignMatrix[i-1][j] - GAP) directionMatrix[i][j].push(UP);
                if (newValue == alignMatrix[i][j-1] - GAP) directionMatrix[i][j].push(LEFT);
                if (newValue == alignMatrix[i-1][j-1] + alignMatrix[i][j]) directionMatrix[i][j].push(UPLEFT);
            } else {
                directionMatrix[i][j].push((j == 0) ? UP : LEFT);
            }
            alignMatrix[i][j] = newValue;
        }
    }
    console.timeEnd("Cálculo do alinhamento");
    console.log("************************")
    //Exibindo as sequências alinhadas
    var basePairs = [[], []];
    var i = seq1.length;
    var j = seq2.length;

    while (i > 0 || j > 0) {
        if(directionMatrix[i][j][0] == UP) {
            i--;
            basePairs[0].push(seq1.charAt(i));
            basePairs[1].push('-');
        } else if(directionMatrix[i][j][0] == LEFT) {
            j--;
            basePairs[0].push('-');
            basePairs[1].push(seq2.charAt(j));
        } else if(directionMatrix[i][j][0] == UPLEFT) {
            i--;
            j--;
            basePairs[0].push(seq1.charAt(i));
            basePairs[1].push(seq2.charAt(j));
        }
    }

    basePairs[0] = basePairs[0].reverse();
    basePairs[1] = basePairs[1].reverse();

    // var alignmentResults = {
    //     basePairs,
    //     alignMatrix,
    //     directionMatrix
    // }

    return basePairs;
} module.exports = NeedlemanWunsch;