const Url = require('../models/url');

// 원본 url을 db에 저장
exports.inputUrl = async (req, res) => {
  const { long_url } = req.body;
  try {
    await Url.create({
      long_url,
    });
    return res.status(201);
  } catch (err) {
    console.log(err);
    return res.status(500).json('server error');
  }
}

// 단축 url 생성
exports.createShortUrl = async (req, res) => {
  const { long_url } = req.body;
  try {
    const url = await Url.findAll({ 
      where: {
        long_url, // 원본 url이 저장되어 있고
        short_url: null, // 단축 url이 아직 생성되지 않았는지 확인
      }
    });

    if (url === false) { // url이 존재하지 않거나 이미 단축 url이 있음
      return res.status(500).json('no url found');
    }

    // 단축 url 생성
    const cut_url = long_url.split('/');
    cut_url.pop(); // 마지막 string 제거
    cut_url.push(url.id); // int형 숫자 삽입
    const short_url = cut_url.join('/'); // 배열 -> 문자열

    await Url.update({
      short_url, // 단축 url 생성
    }, {
      where: {id: url.id}
    });
    return res.status(201).json(short_url);
  } catch (err) {
    console.log(err);
    return res.status(500).json('server error');
  }
}