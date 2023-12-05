const axios = require('axios');
const cheerio = require('cheerio');

const url =
    'https://naruto.fandom.com/vi/wiki/Th%E1%BB%83_lo%E1%BA%A1i:Nh%C3%A2n_v%E1%BA%ADt_Naruto';

const urlCharacter = 'https://naruto.fandom.com/vi/wiki';

const characterController = {
    // [GET] /v1
    getAllCharacters: (req, resp) => {
        const thumbnails = [];
        try {
            axios(url).then((res) => {
                const html = res.data;
                const $ = cheerio.load(html);

                $('.category-page__members-wrapper', html).each(function () {
                    $(this)
                        .find('ul > li')
                        .each(function () {
                            const name = $(this).find('a').attr('title');
                            const url = $(this).find('a').attr('href');
                            const image = $(this)
                                .find('div > a > img')
                                .attr('data-src');

                            thumbnails.push({
                                name: name,
                                url:
                                    'https://api-naruto-h8vd.onrender.com/v1' +
                                    url?.split('/wiki/')[1],
                                image: image || 'Not update',
                            });
                        });
                });
                resp.status(200).json(thumbnails);
            });
        } catch (error) {
            resp.status(500).json(error);
        }
    },

    // [GET] /v1/:character
    getAnCharacter: (req, resp) => {
        const name = req.params.character;
        const titles = [];
        const details = [];
        const objectCharacter = {};
        const characters = [];

        try {
            if (name !== undefined) {
                axios(`${urlCharacter}/${name}`).then((res) => {
                    const html = res.data;
                    const $ = cheerio.load(html);

                    $('aside', html).each(function () {
                        const bannerImg = $(this)
                            .find('figure > a > img')
                            .attr('src');

                        $(this)
                            .find('div > h3')
                            .each(function () {
                                titles.push($(this).text());
                            });

                        $(this)
                            .find('div > div')
                            .each(function () {
                                details.push($(this).text());
                            });

                        if (bannerImg !== undefined) {
                            for (let i = 0; i < titles.length; i++) {
                                objectCharacter[titles[i]] = details[i];
                            }

                            characters.push({
                                name: name,
                                image: bannerImg,
                                ...objectCharacter,
                            });
                        }
                    });

                    resp.status(200).json(characters);
                });
            }
        } catch (error) {
            resp.status(500).json(error);
        }
    },
};

module.exports = characterController;
