import axios from 'axios';

const getAllFood = async ({ ...option }) => {
  let res;
  if (option?.category === 'ALL') {
    res = await axios.get('/api/v1/foods');
  } else {
    res = await axios.get(`/api/v1/foods?category=${option?.category?.toLowerCase()}`);
  }

  if (option?.page && option?.limit) {
    if (option?.sort) {
      res = await axios.get(
        `/api/v1/foods?sort=${option?.sort}&page=${option?.page}&limit=${option?.limit}`
      );
    } else {
      res = await axios.get(`/api/v1/foods?page=${option?.page}&limit=${option?.limit}`);
    }
  }

  return res.data.data;
};

const getAllFoodSale = async () => {
  const { data } = await axios.get('/api/v1/foods?discount[gt]=0');

  return data.data;
};

const getFood = async (foodId) => {
  const { data } = await axios.get(`/api/v1/foods/${foodId}`);

  return data.data.food;
};

const foodAPI = {
  getAllFood,
  getAllFoodSale,
  getFood,
};

export default foodAPI;
