
const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('/home/chandan/Desktop/Data_Source (1)/crimes1'),
});
const fs = require('fs');

const robbery = [];
const bulgary = [];
const part1 = [];
const part2 = [];
const property = [];
const vehicle = [];
const Sproperty = [];


for (let i = 1; i < 17; i++) {
  robbery.push(0);
  bulgary.push(0);
  property.push(0);
  vehicle.push(0);
  Sproperty.push(0);
}


lineReader.on('line', (line) => {
  const currentLine = line.split(',');
  const a = (currentLine[17] % 2000) - 1;
  if (a < 17) {
    if (currentLine[5] == 'BURGLARY' && a != NaN) {
      bulgary[a] += 1;
    }
    if (currentLine[5] == 'ROBBERY' && a != NaN) {
      robbery[a] += 1;
    }
    if (currentLine[6] == 'TO PROPERTY' && a != NaN) {
      property[a] += 1;
    }
    if (currentLine[6] == 'TO STATE SUP PROP' && a != NaN) {
      Sproperty[a] += 1;
    }
    if (currentLine[6] == 'TO VEHICLE' && a != NaN) {
      vehicle[a] += 1;
    }
  }
});
lineReader.on('close', () => {
  for (var i = 0; i < 16; i++) {
    var obj = {
      Year: 2000 + i + 1,
      Burglary: bulgary[i],
      robbery: robbery[i],
    };

    part1.push(obj);
  }
  for (var i = 0; i < 16; i++) {
    var obj = {
      Year: 2000 + i + 1,
      Vehicles: vehicle[i],
      Property: property[i],
      State_Sup_Property: Sproperty[i],
    };

    part2.push(obj);
  }

  for (i = 0; i < 16; i++) {
    var obj = part2[i];
    fs.appendFile('part2.json', JSON.stringify(obj), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('File has been created');
    });
  }


  console.log(part1);
  console.log(part2);
});
