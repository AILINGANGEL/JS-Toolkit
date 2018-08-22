function getFomatJsonString(level, content) {
    let prefix = '';
    let count = level;
    while (count > 0) {
        prefix += '\t';
        count--;
    }
    let text = '';
    for (let key in content) {
        if (content.hasOwnProperty(key)) {
            if (typeof content[key] === 'string') {
                text += prefix + key + ':' + content[key] + '\n';
            } else if (Array.isArray(content[key])) {
                text += prefix + key + ':' + JSON.stringify(content[key]) + '\n';
            } else if (typeof content[key] === 'object') {
                text += getFomatJsonString(level + 1, content[key]);
            }
        }
    }
    return text;
}

function printJSON(content) {
    let level = 0;
    return getFomatJsonString(level, content);
}


var test = {
    a: 'a',
    b: 'b',
    c: {
        c1: 'c1',
        c2: 'c2',
        c3: {
            c3: 'c3',
            c4: [5, 6, 7]
        }
    },
    d: [1, 2, 3]
};
console.log(printJSON(test));
