const categories = [
  {
    name: 'Ремешки и браслеты',
    image: 'http://localhost:5050/uploads/straps.svg',
    description: 'watches',
    slug: 'remeshki-i-braslety',
    pareinId: '',
    orderIndex: 1,
    children: [
      {
        name: 'Универсальные',
        image: '',
        slug: 'universalnye',
        description: '',
        parentId: '',
        orderIndex: 1,
        children: [],
      },
      {
        name: 'Брендовые',
        slug: 'brendovye',
        image: '',
        description: '',
        pareinId: '',
        orderIndex: 2,
        children: [],
      },
      {
        name: 'Сопутствующие товары для установки ремешков',
        image: '',
        slug: 'soputstvuyuwie-tovary',
        description: '',
        pareinId: '',
        orderIndex: 3,
        children: [],
      },
    ],
  },
  {
    name: 'Батарейки',
    image: 'http://localhost:5050/uploads/battaries.svg',
    slug: 'batareiki',
    description: 'watches',
    pareinId: '',
    orderIndex: 2,
    children: [
      {
        name: 'Для часов',
        image: '',
        slug: 'dlya-chasov',
        description: '',
        parentId: '',
        orderIndex: 1,
        children: [],
      },
      {
        name: 'Литиевые',
        image: '',
        slug: 'litievye',
        description: '',
        pareinId: '',
        orderIndex: 2,
        children: [],
      },
      {
        name: 'Для слуховых аппаратов',
        image: '',
        slug: 'dya-sluhovyh-apparatov',
        description: '',
        pareinId: '',
        orderIndex: 3,
        children: [],
      },
      {
        name: 'Бытовые',
        image: '',
        slug: 'bytovye',
        description: '',
        pareinId: '',
        orderIndex: 4,
        children: [],
      },
    ],
  },
  {
    name: 'Зарядные устройства',
    image: 'http://localhost:5050/uploads/charger.svg',
    slug: 'zaryadnye-ustroistva',
    description: 'watches',
    pareinId: '',
    orderIndex: 3,
    children: [
      {
        name: 'Для аккумуляторных батареек',
        slug: 'dya-akkumulyatornyh-batareek',
        image: '',
        description: '',
        parentId: '',
        orderIndex: 1,
        children: [],
      },
      {
        name: 'Для телефонов',
        image: '',
        slug: 'dya-telefonov',
        description: '',
        pareinId: '',
        orderIndex: 2,
        children: [],
      },
    ],
  },
]

export default categories