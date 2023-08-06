const axios = require('axios');


// Search movie
module.exports.searchMovie = async (req, res) => {
  try {
    let {name, page} = req.query;
    page = page ? page:1; 
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://www.omdbapi.com/?s=${name}&page=${page}&apikey=ee52eea`,
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      return res.json({movie: response.data});
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: 'Failed to fetch movie' });
    });
  } catch (err) {
    console.log("Error in search", err);
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
};
