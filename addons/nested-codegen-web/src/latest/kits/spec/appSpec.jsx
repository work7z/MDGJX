let nc = require('../number-to-chinese-words');
describe('power of 10', function(){
  it('10⁰', function () {
    expect(nc.toWords(1)).toEqual('一');
  });

  it('10¹', function () {
    expect(nc.toWords(10)).toEqual('十');
  });

  it('10²',function(){
    expect(nc.toWords(100)).toEqual('一百');
  });

  it('10³',function(){
    expect(nc.toWords(1000)).toEqual('一千');
  });

  it('10⁴',function(){
    expect(nc.toWords(10000)).toEqual('一萬');
  });

  it('10⁵',function(){
    expect(nc.toWords(100000)).toEqual('十萬');
  });

  it('10⁶',function(){
    expect(nc.toWords(1000000)).toEqual('一百萬');
  });

  it('10⁷',function(){
    expect(nc.toWords(10000000)).toEqual('一千萬');
  });

  it('10⁸',function(){
    expect(nc.toWords(100000000)).toEqual('一億');
  });

  it('10⁹',function(){
    expect(nc.toWords(1000000000)).toEqual('十億');
  });

  it('10¹⁰',function(){
    expect(nc.toWords(10000000000)).toEqual('一百億');
  });

  it('10¹¹',function(){
    expect(nc.toWords(100000000000)).toEqual('一千億');
  });

  it('10¹²',function(){
    expect(nc.toWords(1000000000000)).toEqual('一兆');
  });

  it('10¹³',function(){
    expect(nc.toWords(10000000000000)).toEqual('十兆');
  });

  it('10¹⁴',function(){
    expect(nc.toWords(100000000000000)).toEqual('一百兆');
  });

  it('10¹⁵',function(){
    expect(nc.toWords(1000000000000000)).toEqual('一千兆');
  });

  it('10¹⁶',function(){
    expect(nc.toWords(10000000000000000)).toEqual('一京');
  });

  it('10¹⁷',function(){
    expect(nc.toWords(100000000000000000)).toEqual('十京');
  });

  it('10¹⁸',function(){
    expect(nc.toWords(1000000000000000000)).toEqual('一百京');
  });

  it('10¹⁹',function(){
    expect(nc.toWords(10000000000000000000)).toEqual('一千京');
  });

  it('10²⁰',function(){
    expect(nc.toWords(100000000000000000000)).toEqual('一垓');
  });
});

describe('convert numbers', function () {
  it('one', function(){
    expect(nc.toWords(1)).toEqual('一');
  });

  it('ten', function(){
    expect(nc.toWords(10)).toEqual('十');
  });

  it('twenty', function(){
    expect(nc.toWords(20)).toEqual('二十');
  });

  it('one hundred', function(){
    expect(nc.toWords(100)).toEqual('一百');
  });

  it('1001',function(){
    expect(nc.toWords(1001)).toEqual('一千零一');
  });

  it('1021',function(){
    expect(nc.toWords(1021)).toEqual('一千零二十一');
  });

  it('1010',function(){
    expect(nc.toWords(1010)).toEqual('一千零一十');
  });
});

describe('large numbers', function () {
  it('10001', function(){
    expect(nc.toWords(10001)).toEqual('一萬零一');
  });

  it('10021', function(){
    expect(nc.toWords(10021)).toEqual('一萬零二十一');
  });

  it('10321', function(){
    expect(nc.toWords(10321)).toEqual('一萬零三百二十一');
  });

  it('12021', function(){
    expect(nc.toWords(12021)).toEqual('一萬二千零二十一');
  });

  it('zero zero', function(){
    expect(nc.toWords(102506)).toEqual('十萬零二千五百零六');
  });

  it('十一萬', function(){
    expect(nc.toWords(112506)).toEqual('十一萬二千五百零六');
  });

  it('十萬零', function(){
    expect(nc.toWords(10102506)).toEqual('一千零一十萬零二千五百零六');
  });

  it('百萬零', function(){
    expect(nc.toWords(11002506)).toEqual('一千一百萬零二千五百零六');
  });

  it('百萬零', function(){
    expect(nc.toWords(12102506)).toEqual('一千二百一十萬零二千五百零六');
  });

  it('億零', function(){
    expect(nc.toWords(100102506)).toEqual('一億零一十萬零二千五百零六');
  });

  it('億零', function(){
    expect(nc.toWords(100022102506)).toEqual('一千億零二千二百一十萬零二千五百零六');
  });

  it('億零', function(){
    expect(nc.toWords(100000102506)).toEqual('一千億零一十萬零二千五百零六');
  });

  it('京萬億萬零a', function(){
    expect(nc.toWords(10000100022102506)).toEqual('一京零一千億零二千二百一十萬零二千五百零六');
  });

  it('京萬億萬零b', function(){
    expect(nc.toWords(10000000022102506)).toEqual('一京零二千二百一十萬零二千五百零六');
  });

  it('京萬億萬零c', function(){
    expect(nc.toWords(10000000000002506)).toEqual('一京零二千五百零六');
  });

  it('京萬億萬零a', function(){
    expect(nc.toWords(12345678912345678)).toEqual('一京二千三百四十五兆六千七百八十九億一千二百三十四萬五千六百七十八');
  });

  it('京萬億萬零hd', function(){
    expect(nc.toWords(100000000000000000)).toEqual('十京');
  });

  it('32 bit float max value', function(){
    expect(nc.toWords(2147483647)).toEqual('二十一億四千七百四十八萬三千六百四十七');
  });

  it('64 bit float max value', function(){
    expect(nc.toWords(9007199254740992)).toEqual('九千零七兆一千九百九十二億五千四百七十四萬零九百九十二');
  });

  it('7',function(){
    expect(nc.toWords(7000000000000)).toEqual('七兆');
  });
});

describe('samples',function(){
  it('21', function(){
    expect(nc.toOrdinal(21)).toEqual('第21');
  });

  it('word', function(){
    expect(nc.toWords(13)).toEqual('十三');
  });

  it('decimal point', function(){
    expect(nc.toWords(2.9)).toEqual('二點九');
  });

  it('negative', function(){
    expect(nc.toWords(-3)).toEqual('負三');
  });

  it('large', function(){
    expect(nc.toWords(9007199254740992)).toEqual('九千零七兆一千九百九十二億五千四百七十四萬零九百九十二');
  });

  it('ordinal word', function(){
    expect(nc.toWordsOrdinal(21)).toEqual('第二十一');
  });
});