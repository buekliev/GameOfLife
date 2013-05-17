$(function () {
    "use strict";

    function randChar() {

        var collection = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        return collection.charAt(Math.floor(Math.random() * collection.length));
    }

    function initMatrix(cols, rows) {

        var i, j, row, bit,
            m = [];

        for (i = 0; i < rows; i += 1) {
            row = [];
            for (j = 0; j < cols; j += 1) {
                bit = Boolean(Math.round(Math.random()));
                row.push(bit);
            }
            m.push(row);
        }
        return m;
    }

    function drawMatrix(m) {

        var i, j, cols,
            text = "",
            rows = m.length;

        for (i = 0; i < rows; i += 1) {
            cols = m[i].length;
            for (j = 0; j < cols; j += 1) {
                text += m[i][j] ? randChar() : " ";
            }
            text += "\n";
        }
        return text;
    }

    function refreshMatrix(oldMatrix) {

        var i, j, cols, row, bit,
            neighbours = 0,
            newMatrix = [],
            rows = oldMatrix.length;

        function f(top, left) {
            return oldMatrix[(top  + rows) % rows][(left + cols) % cols];
        }

        for (i = 0; i < rows; i += 1) {
            cols = oldMatrix[i].length;
            row = [];
            for (j = 0; j < cols; j += 1) {

                neighbours = f(i - 1, j - 1) + f(i - 1, j) + f(i - 1, j + 1)
                    + f(i, j - 1) + f(i, j + 1)
                    + f(i + 1, j - 1) + f(i + 1, j) + f(i + 1, j + 1);

                if (oldMatrix[i][j]) {
                    if (3 < neighbours || 2 > neighbours) {
                        bit = false;
                    } else {
                        bit = true;
                    }
                } else {
                    if (3 === neighbours) {
                        bit = true;
                    } else {
                        bit = false;
                    }
                }
                row.push(bit);
            }
            newMatrix.push(row);
        }
        return newMatrix;
    }

    var $world = $(".js-world"),
        matrix = initMatrix(80, 40);

    setInterval(function() {
        $world.text(drawMatrix(matrix));
        matrix = refreshMatrix(matrix);
    }, 20);
});