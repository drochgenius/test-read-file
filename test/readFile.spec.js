const fs = require('fs');
const { expect } = require('chai');

const FILE = 'data/toc.xhtml';
const FILE_LENGTH = 57149;


function delay(wait = 100) {
    return new Promise(resolve => setTimeout(resolve, wait));
}

function readFile(done) {
    fs.readFile(FILE, 'utf8', (err, data) => {
        expect(err).to.be.null;
        expect(data).not.to.be.undefined;
        expect(typeof data).to.equal('string');
        expect(data.length).to.equal(FILE_LENGTH);
        done();
    });
}

function readFileAsPromise() {
    return new Promise(readFile);
}

describe('fs.readFile reading file as string', () => {
    it('should read the entire file', readFile);

    it('should read the entire file inside a Promise', () =>
        readFileAsPromise());

    it('should read the entire file inside a Promise with delay before', () =>
        delay().then(readFileAsPromise));

    it('should read the entire file when called multiple times', () =>
        delay()
            .then(readFileAsPromise)
            .then(readFileAsPromise)
            .then(readFileAsPromise)
            .then(readFileAsPromise));
});

