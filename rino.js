const got = require('got');
const psi = require('psi');
const prettyBytes = require('pretty-bytes');
const fs = require('fs')

var psiPromise = arg => new Promise((resolve, reject) => psi(arg).then(data => {


    let d = data.pageStats;
    let total = prettyBytes(parseInt(d.totalRequestBytes) + parseInt(d.htmlResponseBytes) + parseInt(d.cssResponseBytes) + parseInt(d.javascriptResponseBytes) + parseInt(d.otherResponseBytes) + parseInt(d.imageResponseBytes));

    data[totalSize] = total;
    resolve(data)
}));

function median(values) {

    values.sort(function(a, b) {
        return a - b;
    });

    var half = Math.floor(values.length / 2);

    if (values.length % 2)
        return values[half];
    else
        return (values[half - 1] + values[half]) / 2.0;
}

function mean(values) {
    let sum = values.reduce((previous, current) => current += previous);
    return sum / values.length;
}




class Rino {

    constructer(x, y) {


        this.x = x;
        this.y = y;


    }

    httpBenchmark(arg, num) {
        let rino = [];

        for (let i = 0; i < num; i++) {
            rino.push(new Promise((resolve, reject) => {
                got(arg).then(data => {
                    let f = ((new Date() - s) / 1000.0).toFixed(2);
                    resolve(f);
                })
            }))
        }
        let s = new Date();
        return Promise.all(rino)
            .then(results => {
                let stop = ((new Date() - s) / 1000.0).toFixed(2);
                for (let i = 0; i < num; i++) {
                    results[i] = parseFloat(results[i]);

                }
                let sum = results.reduce((a, b) => a + b, 0).toFixed(2);


                let avg = mean(results).toFixed(2);

                let med = median(results);


                return {
                    results: results,
                    totalTime: stop,
                    mean: avg,
                    median: med
                }

            }).then(results => {
                return results
            })
            .catch(err => {
                console.log(err);
            });
    }
    size(arg) {

        return new Promise((resolve, reject) => psi(arg).then(data => {


        let d = data.pageStats;
        let total = prettyBytes(parseInt(d.totalRequestBytes) + parseInt(d.htmlResponseBytes) + parseInt(d.cssResponseBytes) + parseInt(d.javascriptResponseBytes) + parseInt(d.otherResponseBytes) + parseInt(d.imageResponseBytes));

        data['totalSize'] = total;
        delete data['formattedResults']
        delete data['version'];
        delete data['kind']
        resolve(data)
    }));
}


}



module.exports = function(test, num) {

    if (!num) {
        num = 100;
    } else if (num > 1000000) {
        console.log("Please consider lowering the amount of HTTP requests. " + num + " is way more than necessary. ")
    }

    var rino = new Rino();


    rino.httpBenchmark(test, num).then(results => {

        fs.writeFile(__dirname + '/benchmark.json', JSON.stringify(results, null, 4), function(err) {
            if (err) {
                return console.log(err);
            }

            console.log("Wrote benchmark data to benchmark.json!");
        });



    });


    rino.size(test).then(results => {
        fs.writeFile(__dirname + '/size.json', JSON.stringify(results, null, 4), function(err) {
            if (err) {
                return console.log(err);
            }

            console.log("Wrote size data to size.json!");
        });    });





}
