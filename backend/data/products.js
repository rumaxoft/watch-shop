const products = [
  {
    name: 'Ремешок кожаный',
    images: [
      {
        big: `${process.env.API_PREFIX}/uploads/11.jpg`,
        thumb: `${process.env.API_PREFIX}/uploads/11.jpg`,
      },
      {
        big: `${process.env.API_PREFIX}/uploads/12.jpg`,
        thumb: `${process.env.API_PREFIX}/uploads/12.jpg`,
      },
      {
        big: `${process.env.API_PREFIX}/uploads/13.jpg`,
        thumb: `${process.env.API_PREFIX}/uploads/13.jpg`,
      },
      {
        big: `${process.env.API_PREFIX}/uploads/14.jpg`,
        thumb: `${process.env.API_PREFIX}/uploads/14.jpg`,
      },
    ],
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Seiko',
    category: [
      '/Ремешки и браслеты/Универсальные',
      '/Ремешки и браслеты/Брендовые',
    ],
    price: 99,
    countInStock: 3,
    discount: 10,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Ремешок полимерный',
    images: [
      {
        big: `${process.env.API_PREFIX}/uploads/21.jpg`,
        thumb: `${process.env.API_PREFIX}/uploads/21.jpg`,
      },
    ],
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Seiko',
    category: ['/Ремешки и браслеты/Универсальные'],
    price: 600,
    countInStock: 10,
    discount: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Зажимы',
    images: [
      {
        big: `${process.env.API_PREFIX}/uploads/31.jpg`,
        thumb: `${process.env.API_PREFIX}/uploads/31.jpg`,
      },
    ],
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Hublot',
    category: ['/Ремешки и браслеты/Универсальные'],
    price: 999,
    countInStock: 0,
    discount: 10,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Шпильки для ремешков',
    images: [
      {
        big: `${process.env.API_PREFIX}/uploads/41.jpg`,
        thumb: `${process.env.API_PREFIX}/uploads/41.jpg`,
      },
    ],
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Hublot',
    category: ['/Ремешки и браслеты/Универсальные'],
    price: 400,
    countInStock: 10,
    discount: 10,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Батарейки',
    images: [
      {
        big: `${process.env.API_PREFIX}/uploads/51.webp`,
        thumb: `${process.env.API_PREFIX}/uploads/51.webp`,
      },
    ],
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Rolex',
    category: ['/Ремешки и браслеты/Универсальные'],
    price: 98,
    countInStock: 7,
    discount: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Батарейки',
    images: [
      {
        big: `${process.env.API_PREFIX}/uploads/61.webp`,
        thumb: `${process.env.API_PREFIX}/uploads/61.webp`,
      },
    ],
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Rolex',
    category: [
      '/Ремешки и браслеты/Универсальные',
      '/Батарейки/Для слуховых аппаратов',
    ],
    price: 300,
    countInStock: 0,
    discount: 10,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Батарейки бытовые',
    images: [
      {
        big: `${process.env.API_PREFIX}/uploads/71.jpg`,
        thumb: `${process.env.API_PREFIX}/uploads/71.jpg`,
      },
    ],
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Rolex',
    category: ['/Ремешки и браслеты/Универсальные', '/Батарейки/Бытовые'],
    price: 30,
    countInStock: 0,
    discount: 0,
    rating: 0,
    numReviews: 0,
  },
]

export default products
