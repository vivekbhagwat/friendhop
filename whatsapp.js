var q = require('q'),
    fs = require('fs');

var DR = require('./data_reader.js');

var WhatsApp = {
    read: DR.read,

    //sample text:
    //8/5/13, 9:26:11 PM: Vivek: <text here>
    parse: function(data) {
        var lines = data.match(/[^\r\n]+/g);
       
        for(var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var time = line.match(/\d+\/\d+\/\d\d, \d+:\d\d:\d\d (A|P)M/g);
            if (time === null) {
                lines[i] = null;
                continue;
            }
            time = time[0];
            line = line.substring(time.length+1);
            time = new Date(time);
            
            var sender = line.match(/:? ([A-z\s]+):/);
            if (sender === null) {
                lines[i] = null;
                continue;
            }
            sender = sender[1];
            if (sender === "Vivek") {
                sender = "Vivek Bhagwat";
            }

            text = line.match(/:(.*)$/);
            if (text === null) {
                lines[i] = null;
                continue;
            }
            text = text[1];

            lines[i] = {
                text: text,
                timestamp: time,
                sender: sender,
                medium: "text"
            }
        }

        return lines;
    }
}

//TODO make main??
WhatsApp.read("data/whatsapp.txt").done(function (data) {
    var texts = WhatsApp.parse(data);
    console.log(texts);
});

