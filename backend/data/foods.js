const foods = [
  {
    name: "Crunchy Bread",
    category: "bread",
    price: 24.0,
    image: "/images/bread-crunchy-1.png",
    imageDetails: [
      "/images/bread-crunchy-1.png",
      "/images/bread-crunchy-2.png",
      "/images/bread-crunchy-3.png",
    ],
    discount: 10,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
    reviews: [],
    numReviews: 0,
    rating: 3.5,
    countInStock: 7,
  },
  {
    name: "Pork Bread",
    category: "bread",
    price: 32.0,
    image: "/images/bread-pork-1.png",
    imageDetails: [
      "/images/bread-pork-1.png",
      "/images/bread-pork-2.png",
      "/images/bread-pork-3.png",
    ],
    discount: 12,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
    reviews: [],
    numReviews: 0,
    rating: 4,
    countInStock: 4,
  },
  {
    name: "Delicious Bread",
    category: "bread",
    price: 28.0,
    image: "/images/bread-delicious-1.png",
    imageDetails: [
      "/images/bread-delicious-1.png",
      "/images/bread-delicious-2.png",
      "/images/bread-delicious-3.png",
    ],
    discount: 10,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
    reviews: [],
    numReviews: 0,
    rating: 3,
    countInStock: 6,
  },
  {
    name: "Sandwich Bread",
    category: "bread",
    price: 30.0,
    image: "/images/bread-sandwich-1.png",
    imageDetails: [
      "/images/bread-sandwich-1.png",
      "/images/bread-sandwich-2.png",
      "/images/bread-sandwich-3.png",
    ],
    discount: 10,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
    reviews: [],
    numReviews: 0,
    rating: 3.5,
    countInStock: 5,
  },
  {
    name: "Stick Bread",
    category: "bread",
    price: 15.0,
    image: "/images/bread-stick-1.png",
    imageDetails: [
      "/images/bread-stick-1.png",
      "/images/bread-stick-2.png",
      "/images/bread-stick-3.png",
    ],
    discount: 0,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
    reviews: [],
    numReviews: 0,
    rating: 2.5,
    countInStock: 4,
  },
  {
    name: "Beef Burger",
    category: "burger",
    price: 36.0,
    image: "/images/burger-beef-1.jpg",
    imageDetails: [
      "/images/burger-beef-1.jpg",
      "/images/burger-beef-2.jpg",
      "/images/burger-beef-3.jpg",
    ],
    discount: 10,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
    reviews: [],
    numReviews: 0,
    rating: 5,
    countInStock: 10,
  },
  {
    name: "Cheese Burger",
    category: "burger",
    price: 42.0,
    image: "/images/burger-cheese-1.jpg",
    imageDetails: [
      "/images/burger-cheese-1.jpg",
      "/images/burger-cheese-2.jpg",
      "/images/burger-cheese-3.jpg",
    ],
    discount: 12,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
    reviews: [],
    numReviews: 0,
    rating: 4.5,
    countInStock: 9,
  },
  {
    name: "Chicken Burger",
    category: "burger",
    price: 48.0,
    image: "/images/burger-chicken-1.jpg",
    imageDetails: [
      "/images/burger-chicken-1.jpg",
      "/images/burger-chicken-2.jpg",
      "/images/burger-chicken-3.jpg",
    ],
    discount: 10,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
    reviews: [],
    numReviews: 0,
    rating: 3.5,
    countInStock: 7,
  },
  {
    name: "Classic Burger",
    category: "burger",
    price: 32.0,
    image: "/images/burger-classic-1.jpg",
    imageDetails: [
      "/images/burger-classic-1.jpg",
      "/images/burger-classic-2.jpg",
      "/images/burger-classic-3.jpg",
    ],
    discount: 0,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
    reviews: [],
    numReviews: 0,
    rating: 3,
    countInStock: 6,
  },
  {
    name: "Royal Burger",
    category: "burger",
    price: 52.0,
    image: "/images/burger-royal-1.jpg",
    imageDetails: [
      "/images/burger-royal-1.jpg",
      "/images/burger-royal-2.jpg",
      "/images/burger-royal-3.jpg",
    ],
    discount: 10,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
    reviews: [],
    numReviews: 0,
    rating: 4,
    countInStock: 8,
  },
  {
    name: "Turkey Burger",
    category: "burger",
    price: 30.0,
    image: "/images/burger-turkey-1.jpg",
    imageDetails: [
      "/images/burger-turkey-1.jpg",
      "/images/burger-turkey-2.jpg",
      "/images/burger-turkey-3.jpg",
    ],
    discount: 0,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
    reviews: [],
    numReviews: 0,
    rating: 4.5,
    countInStock: 9,
  },
  {
    name: "Bulgogi Pizza",
    category: "pizza",
    price: 79.0,
    image: "/images/pizza-bulgogi-1.jpg",
    imageDetails: [
      "/images/pizza-bulgogi-1.jpg",
      "/images/pizza-bulgogi-2.jpg",
      "/images/pizza-bulgogi-3.jpg",
    ],
    discount: 10,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
    reviews: [],
    numReviews: 0,
    rating: 2,
    countInStock: 4,
  },
  {
    name: "Cheese Pizza",
    category: "pizza",
    price: 60.0,
    image: "/images/pizza-cheese-1.jpg",
    imageDetails: [
      "/images/pizza-cheese-1.jpg",
      "/images/pizza-cheese-2.jpg",
      "/images/pizza-cheese-3.jpg",
    ],
    discount: 0,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
    reviews: [],
    numReviews: 0,
    rating: 2.5,
    countInStock: 5,
  },
  {
    name: "Germany Pizza",
    category: "pizza",
    price: 89.0,
    image: "/images/pizza-germany-1.png",
    imageDetails: [
      "/images/pizza-germany-1.png",
      "/images/pizza-germany-2.jpg",
      "/images/pizza-germany-3.jpg",
    ],
    discount: 12,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
    reviews: [],
    numReviews: 0,
    rating: 4,
    countInStock: 6,
  },
  {
    name: "Italia Pizza",
    category: "pizza",
    price: 99.0,
    image: "/images/pizza-italia-1.jpg",
    imageDetails: [
      "/images/pizza-italia-1.jpg",
      "/images/pizza-italia-2.jpg",
      "/images/pizza-italia-3.png",
    ],
    discount: 15,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
    reviews: [],
    numReviews: 0,
    rating: 4.5,
    countInStock: 7,
  },
  {
    name: "Kebab Pizza",
    category: "pizza",
    price: 129.0,
    image: "/images/pizza-kebab-1.jpg",
    imageDetails: [
      "/images/pizza-kebab-1.jpg",
      "/images/pizza-kebab-2.jpg",
      "/images/pizza-kebab-3.jpg",
    ],
    discount: 20,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
    reviews: [],
    numReviews: 0,
    rating: 3.5,
    countInStock: 6,
  },
  {
    name: "Lumacun Pizza",
    category: "pizza",
    price: 69.0,
    image: "/images/pizza-lumacun-1.jpg",
    imageDetails: [
      "/images/pizza-lumacun-1.jpg",
      "/images/pizza-lumacun-2.jpg",
      "/images/pizza-lumacun-3.jpg",
    ],
    discount: 0,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
    reviews: [],
    numReviews: 0,
    rating: 3,
    countInStock: 8,
  },
  {
    name: "Seafood Pizza",
    category: "pizza",
    price: 159,
    image: "/images/pizza-seafood-1.jpg",
    imageDetails: [
      "/images/pizza-seafood-1.jpg",
      "/images/pizza-seafood-2.jpg",
      "/images/pizza-seafood-3.png",
    ],
    discount: 25,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
    reviews: [],
    numReviews: 0,
    rating: 2.5,
    countInStock: 7,
  },
  {
    name: "Tarte Pizza",
    category: "pizza",
    price: 89,
    image: "/images/pizza-tarte-1.jpg",
    imageDetails: [
      "/images/pizza-tarte-1.jpg",
      "/images/pizza-tarte-2.jpg",
      "/images/pizza-tarte-3.jpg",
    ],
    discount: 0,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
    reviews: [],
    numReviews: 0,
    rating: 4,
    countInStock: 6,
  },
  {
    name: "Vegetarian Pizza",
    category: "pizza",
    price: 59,
    image: "/images/pizza-vegetarian-1.jpg",
    imageDetails: [
      "/images/pizza-vegetarian-1.jpg",
      "/images/pizza-vegetarian-2.jpg",
      "/images/pizza-vegetarian-3.jpg",
    ],
    discount: 0,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque. ",
    reviews: [],
    numReviews: 0,
    rating: 5,
    countInStock: 3,
  },
];

module.exports = foods;
