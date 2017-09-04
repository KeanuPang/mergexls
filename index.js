'use strict';

const winston = require('winston');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const Rx = require('rxjs');
const xlsx = require('node-xlsx');

const FILE_PATH = 'data';
const FILE_OUTPUT = 'result.xlsx';

const readFile = () => {
    let resultSheets = [];
    return Rx.Observable.create(subscriber => {
        glob(FILE_PATH + "/*.csv", {}, (er, files) => {
            files.map((file) => {
                let data = xlsx.parse(path.join(__dirname, file));
                data[0].name = path.basename(file).split('.')[0];
                resultSheets.push(data[0]);
                subscriber.next({});
            });

            subscriber.complete();
        });
    }).last().concatMap(() => {
        return Rx.Observable.create(subscriber => {
            fs.writeFile(path.join(__dirname, FILE_OUTPUT), xlsx.build(resultSheets), (err) => {
                if (err) {
                    return subscriber.error(err);
                }

                subscriber.next({});
                subscriber.complete();
            });
        });
    });
};


readFile().subscribe(
    (result) => {
    }, (err) => {
        winston.error('=== Failed:', err);
    }, () => {
        winston.info('=== Done:', FILE_OUTPUT);
    }
);
