const Url = require('../models/url');

// 원본 url을 db에 저장
exports.inputUrl = async (req, res) => {
  const { url } = req.body;
  console.log(url);
  try {
    await Url.create({
      long_url: url,
    });
    return res.status(201).json('sucess store');
  } catch (err) {
    console.log(err);
    return res.status(500).json('server error');
  }
}

// 단축 url 생성
exports.createShortUrl = async (req, res) => {
  const { url } = req.body;
  try {
    const myUrl = await Url.findOne({
      where: {
        long_url: url, // 원본 url이 저장되어 있고
        short_url: null, // 단축 url이 아직 생성되지 않았는지 확인
      }
    });

    if (!myUrl) { // url이 존재하지 않거나 이미 단축 url이 있음
      throw new Error('no url found'); // 에러 throw
    }

    // 단축 url 생성
    const cut_url = url.split('/');
    cut_url.pop(); // 마지막 string 제거
    cut_url.push(myUrl.id); // int형 숫자 삽입
    const short_url = cut_url.join('/'); // 배열 -> 문자열

    await Url.update({
      short_url, // 단축 url 생성
    }, {
      where: { id: myUrl.id }
    });

    const res_url = { "url": short_url };
    return res.status(201).json(res_url);
  } catch (err) {
    console.error(err);
    return res.status(500).json('server error');
  }
}