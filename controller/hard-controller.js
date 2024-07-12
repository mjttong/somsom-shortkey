const Hard = require('../models/hard');
const { customAlphabet } = require('nanoid');

exports.hardUrl = async (req, res) => {
  const { url } = req.body;

  try {
    const myUrl = await Hard.findOne({ // 해당 url 존재 검사
      where: { long_url: url }
    });

    if (myUrl) { // db에 해당 url 존재
      const res_url = { "short": 'http://localhost:8000/'+ myUrl.short_url };
      return res.status(200).json(res_url);
    }

    const nanoid = customAlphabet('0123456789', 13); // 새로운 nanoid 함수를 생성, 10진수 13자
    
    let myUrl_id = -1;
    let url_id;
    while(myUrl_id) { // 중복 여부 확인
      url_id = nanoid();
      myUrl_id = await Hard.findOne({
        where: {id: url_id}
      });
    }

    // 62진법 변환
    let url_id_int = parseInt(url_id);
    const base62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let base62_id = "";

    while (url_id_int > 0) {
      base62_id += base62[url_id_int % 62];
      url_id_int = Math.floor(url_id_int / 62);
    }
    base62_id = base62_id.split('').reverse().join(''); // 문자열 뒤집기

    await Hard.create({ // 데이터베이스 레코드 생성
      id: url_id,
      long_url: url,
      short_url: base62_id,
    });

    // 반환값 설정
    const short_url = 'http://localhost:8000/' + base62_id;

    const res_url = { "short": short_url };
    return res.status(201).json(res_url);
  } catch (err) {
    console.error(err);
    return res.status(500).json('server error');
  }
}
