# rino

[![npm](https://img.shields.io/npm/dt/rino.svg)](https://npmjs.com/package/rino)
[![npm](https://img.shields.io/npm/v/rino.svg)](http://npmjs.com/package/rino)
[![npm](https://img.shields.io/npm/l/rino.svg)]()

Simple and accurate website load testing and analysis

## Installation

    npm install --save rino

## Usage

```
    // somefile.js
    var rino = require('rino');


    rino('siwiec.us', 200)
    // to run metrics + a 200 http request benchmark

    rino('siwiec.us')
    // to run metrics + a default 100 http request benchmark

```

When run, this code will:
    1. Produce two files in the same directory as the code named benchmark.json and size.json.
    2. Populate those files with information collected from those files


# Example files

Note: these files were run with `rino('siwiec.us', 100)` and units are in seconds

benchmark.json:
```
{
    "results": [
        0.74,
        0.75,
        0.75,
        0.75,
        0.76,
        0.78,
        0.78,
        0.79,
        0.79,
        0.79,
        0.79,
        0.79,
        0.79,
        // And so on
    ],
    "totalTime": "2.49",
    "mean": "1.47",
    "median": 1.585
}
```
size.json:
```
{
    "id": "https://siwiec.us/",
    "responseCode": 200,
    "title": "Adam Siwiec - Full Stack Developer",
    "ruleGroups": {
        "SPEED": {
            "score": 91
        },
        "USABILITY": {
            "score": 100
        }
    },
    "pageStats": {
        "numberResources": 16,
        "numberHosts": 4,
        "totalRequestBytes": "1591",
        "numberStaticResources": 10,
        "htmlResponseBytes": "12053",
        "cssResponseBytes": "1018",
        "imageResponseBytes": "199903",
        "javascriptResponseBytes": "303899",
        "otherResponseBytes": "43161",
        "numberJsResources": 2,
        "numberCssResources": 1
    },
    "totalSize": "562 kB"
}
```


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

I wanted some solid, consistent data from some of the websites so I could compare different providers speeds. I couldn't find an all-in-one, simple, no-setup option, so I created my own. Tada it's rino!

## Credits

- Adam Siwiec - [Website](https://siwiec.us)

## Todo:

    * Have the json files be returned as objects in code
    * Create a cli

## Licensed under the MIT License
