/* eslint linebreak-style: ["error", "unix"] */
/* eslint-env node, mocha */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-expressions */

/**
 * Module dependencies.
 */
const leboncoin = require('leboncoin-api');
// eslint-disable-next-line

exports.search = async (req, res) => {
  const { dep, price_min, price_max, furnished } = req.query;
  try {
    const search = new leboncoin.Search()
      .setPage(1)
      .setQuery('renove')
      .setFilter(leboncoin.FILTERS.PARTICULIER)
      .setCategory('locations')
      .setRegion('ile_de_france')
      .setDepartment(dep)
      // .setLocation([{ zipcode: '78100' }, { zipcode: '78000' }])
      .addSearchExtra('price', { min: parseInt(price_min), max: parseInt(price_max) }) // will add a range of price
      .addSearchExtra('furnished', ['1', 'Non meublé']); // will add enums for Meublé and Non meublé

    const data = await search.run();
    return res.json({
      ok: true,
      result: {
        total: data.nbResult,
        bookings: data.results,
      },
    });
  } catch (err) {
    switch (err.code) {
      case 11000:
        return res.status(400).json({
          ok: false,
          result: {
            message: req.t('ERR_ON_LEBONCOIN_API'),
          },
        });
      default:
        return res.status(err.status ? err.status : 500).json({
          ok: false,
          result: {
            message: err.message ? err.message : req.t('ERROR_ON_SERVER'),
          },
        });
    }
  }
};
